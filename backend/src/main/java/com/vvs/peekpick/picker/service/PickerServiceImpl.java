package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.exception.ExceptionStatus;
import com.vvs.peekpick.member.dto.AvatarDto;
import com.vvs.peekpick.member.service.MemberServiceImpl;
import com.vvs.peekpick.picker.dto.*;
import com.vvs.peekpick.picker.repository.PickerJpaRepository;
import com.vvs.peekpick.picker.repository.PickerRedisRepository;
import com.vvs.peekpick.picker.repository.SseEmitterRepository;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickerServiceImpl implements PickerService {

    // Redis에 저장될 Key
    private final String CONNECT_SESSION = "session";
    private final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final int REQUEST_TIMEOUT = 15;
    private final String REQUEST_REJECTED = "채팅이 거절되었습니다.";
    private final String REQUEST_ACCEPTED = "채팅이 수락되었습니다.";

    // 주변 최대 Picker 수
    private final int MAX_PICKER_COUNT = 15;
    private final Random random = new Random();

    private final ResponseService responseService;
    private final PickerJpaRepository pickerJpaRepository;
    private final PickerRedisRepository pickerRedisRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final SseEmitterRepository sseEmitterRepository;
    private final MemberServiceImpl memberService;
    private final ChatService chatService;

    private GeoOperations<String, String> geoOperations;

    @PostConstruct
    public void init() {
        geoOperations = redisTemplate.opsForGeo();
    }

    /**
     * 현재 사용자의 위치와 ID를 세션에 등록
     *
     * @param picker - 세션에 등록될 Picker의 정보
     * @return CommonResponse
     */
    @Override
    public CommonResponse connectSession(ConnectingPickerDto picker) {
        geoOperations.add(CONNECT_SESSION, picker.getPoint(), String.valueOf(picker.getAvatarId()));
        return responseService.successCommonResponse(ResponseStatus.CONNECTING_SUCCESS);
    }

    /**
     * SSE 푸시 알림을 위해 Emitter 등록
     *
     * @param avatarId - SSE Emitter를 구분할 회원 아바타 Id
     * @return SSE Emitter - Server Sent Event 룰 수신하는 Emitter
     */
    @Override
    public SseEmitter connectSseSession(Long avatarId) {
        log.info("=== Picker Service : {} ===", avatarId);
        SseEmitter emitter = createEmitter(avatarId);
        // 연결 수립을 위한 Dummy 이벤트 전송
        sendToClient(avatarId, avatarId + " : [SSE Emitter Created]");
        return emitter;
    }

    /**
     * 백그라운드로 나가거나, 웹 종료시 세션에서 제거
     *
     * @param avatarId - 세션에서 제거될 Picker 의 Avatar Id
     * @return CommonResponse - 정상 상태코드와 메세지
     */
    @Override
    public CommonResponse disconnectSession(Long avatarId) {
        geoOperations.remove(CONNECT_SESSION, String.valueOf(avatarId));
        return responseService.successCommonResponse(ResponseStatus.DISCONNECT_SUCCESS);
    }

    /**
     * 채팅 요청 전송
     *
     * @param targetId       - SSE를 받는 대상 ID
     * @param senderAvatarId - 보낸 사람의 ID
     * @return CommonResponse - 정상 상태코드와 메세지
     */
    @Override
    public CommonResponse chatRequestSend(Long targetId, Long senderAvatarId) {
        // 요청 시간 만료 판별을 위한 현재 서버시간 적용
        ChatRequestDto chatRequestDto = ChatRequestDto.builder()
                .senderId(senderAvatarId)
                .requestTime(LocalDateTime.now()).build();
        sendToClient(targetId, chatRequestDto);
        return responseService.successCommonResponse(ResponseStatus.CHAT_REQUEST_SUCCESS);
    }

    /**
     * 채팅 요청에 대한 응답으로 수락하여도 시간을 비교하여 만료 처리
     *
     * @param chatResponseDto - 요청에 응답한 회원의 ID
     * @return CommonResponse
     */
    @Override
    public DataResponse chatResponseReceive(ChatResponseDto chatResponseDto) {
        // 거절
        if ("N".equals(chatResponseDto.getResponse())) {
            sendToClient(chatResponseDto.getRequestSenderId(), REQUEST_REJECTED);
            return responseService.successDataResponse(ResponseStatus.CHAT_REQUEST_REJECTED, null);
        }
        // 수락
        else {
            // 요청 시간이 만료되기 이전
            if (chatResponseDto.getRequestTime().plusSeconds(REQUEST_TIMEOUT).isAfter(LocalDateTime.now())) {
                GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
                Point point = geoOperations.position(CONNECT_SESSION, String.valueOf(chatResponseDto.getRequestSenderId())).get(0);
                if (point == null) { // 상대가 접속중이지 않을 때
                    throw new CustomException(ExceptionStatus.PICKER_NOT_FOUNDED);
                } else { // 상대가 접속중일 때
                    String roomId = chatService.createChatRoom();

                    // 요청자 + 채팅방 정보 ( 응답자에게 전송 )
                    ChatNotificationDto senderNotification = ChatNotificationDto.builder()
                            .opponent(chatResponseDto.getRequestSenderId())
                            .roomId(roomId)
                            .build();

                    // 응답자 + 채팅방 정보 ( 요청자에게 전송 )
                    ChatNotificationDto receiverNotification = ChatNotificationDto.builder()
                            .opponent(chatResponseDto.getRequestReceiverId())
                            .roomId(roomId)
                            .build();
                    sendToClient(chatResponseDto.getRequestSenderId(), receiverNotification);
                    return responseService.successDataResponse(ResponseStatus.CHAT_REQUEST_ACCEPTED, senderNotification);
                }
            }
            // 요청 시간이 만료된 이후
            else {
                return responseService.successDataResponse(ResponseStatus.CHAT_REQUEST_TIMEOUT, null);
            }
        }
    }

    /**
     * 거리순으로 Picker 조회
     *
     * @param picker - 현재 위치, Id, 반경이 포함된 Picker 정보
     * @return DataResponse<List> - 조회된 Picker 의 이모지, 닉네임, 한줄소개, 취향 정보
     */
    @Override
    public DataResponse getPickerListByDistance(SearchPickerDto picker) {
        // 현재위치로부터 반경 Distance(m)에 있는 Picker 리스트 조회
        GeoResults<RedisGeoCommands.GeoLocation<String>> radius = geoOperations.radius(CONNECT_SESSION, new Circle(picker.getPoint(), picker.getDistance()));

        HashSet<String> pickerList = new HashSet<>();

        // 반경 이내에 있는 Picker 인원 수
        int pickerSize = radius.getContent().size();

        // Max count 이하는 전부 반환
        if (pickerSize <= MAX_PICKER_COUNT) {
            radius.getContent().stream()
                    .filter(value -> !value.getContent().getName().equals(picker.getAvatarId().toString()))
                    .forEach(value -> pickerList.add(value.getContent().getName()));
        } else { // Max Count 이상은 랜덤으로 15명 선택
            while (pickerList.size() < MAX_PICKER_COUNT) {
                int randomIdx = random.nextInt(pickerSize);
                GeoResult<RedisGeoCommands.GeoLocation<String>> value = radius.getContent().get(randomIdx);
                // 검색 결과에서 본인 제거
                if (value.getContent().getName().equals(picker.getAvatarId().toString())) continue;

                pickerList.add(value.getContent().getName());
            }
        }

        List<AvatarDto> avatarDtoList = new ArrayList<>();
        // 획득한 Id를 통해 이모지, 닉네임, 한줄소개, 호불호 반환
        pickerList.forEach(value -> avatarDtoList.add(memberService.getAvatarInfo(Long.parseLong(value))));

        return responseService.successDataResponse(ResponseStatus.CONNECTION_LIST_SEARCH_SUCCESS, avatarDtoList);
    }

    /**
     * Server Push를 위한 SSE Emitter 생성 및 등록
     *
     * @param avatarId - SSE Emitter로 등록할 회원 아바타 아이디
     * @return SseEmitter - 생성한 Sse Emitter
     */
    private SseEmitter createEmitter(Long avatarId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        sseEmitterRepository.put(avatarId, emitter);

        emitter.onCompletion(() -> sseEmitterRepository.remove(avatarId));
        emitter.onTimeout(() -> sseEmitterRepository.remove(avatarId));

        return emitter;
    }

    /**
     * target에게 Server Sent Event 전송
     *
     * @param targetId - SSE를 받는 대상 ID
     * @param data     - Event 내용
     */
    private void sendToClient(Long targetId, Object data) {
        SseEmitter emitter = sseEmitterRepository.get(targetId).orElseThrow(
                () -> new CustomException(ExceptionStatus.PICKER_NOT_FOUNDED)
        );

        try {
            emitter.send(SseEmitter.event().id(String.valueOf(targetId)).data(data));
        } catch (Exception e) {
            sseEmitterRepository.remove(targetId);
            emitter.completeWithError(e);
        }
    }

}

