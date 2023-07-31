package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.exception.ExceptionStatus;
import com.vvs.peekpick.picker.dto.ConnectingPickerDto;
import com.vvs.peekpick.picker.dto.SearchPickerDto;
import com.vvs.peekpick.picker.repository.PickerJpaRepository;
import com.vvs.peekpick.picker.repository.PickerRedisRepository;
import com.vvs.peekpick.picker.repository.SseEmitterRepository;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashSet;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickerServiceImpl implements PickerService {

    // Redis에 저장될 Key
    private final String CONNECT_SESSION = "session";
    private final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    // 주변 최대 Picker 수
    private final int MAX_PICKER_COUNT = 15;
    private final Random random = new Random();

    private final ResponseService responseService;
    private final PickerJpaRepository pickerJpaRepository;
    private final PickerRedisRepository pickerRedisRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final SseEmitterRepository sseEmitterRepository;

    /**
     * 현재 사용자의 위치와 ID를 세션에 등록
     * @param picker - 세션에 등록될 Picker의 정보
     * @return CommonResponse
     */
    @Override
    public CommonResponse connectSession(ConnectingPickerDto picker) {
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
        geoOperations.add(CONNECT_SESSION, picker.getPoint(), String.valueOf(picker.getMemberId()));

        // TODO JWT Token 으로부터 추출하여 SSE Emitter 전환 예정
//        responseService.successCommonResponse(ResponseStatus.CONNECTING_SUCCESS);

        return responseService.successCommonResponse(ResponseStatus.CONNECTING_SUCCESS);
    }

    /**
     * SSE 푸시 알림을 위해 Emitter 등록
     * @param memberId - SSE Emitter를 구분할 회원 Id
     * @return SSE Emitter - Server Sent Event 룰 수신하는 Emitter
     */
    @Override
    public SseEmitter connectSseSession(Long memberId) {
        SseEmitter emitter = createEmitter(memberId);
        // 연결 수립을 위한 Dummy 이벤트 전송
        sendToClient(memberId, memberId + " : [SSE Emitter Created]");
        return emitter;
    }

    /**
     *  백그라운드로 나가거나, 웹 종료시 세션에서 제거
     * @param picker - 세션에서 제거될 Picker 의 정보
     * @return CommonResponse - 정상 상태코드와 메세지
     */
    @Override
    public CommonResponse disconnectSession(ConnectingPickerDto picker) {
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
        geoOperations.remove(CONNECT_SESSION, picker.getMemberId().toString());
        return responseService.successCommonResponse(ResponseStatus.DISCONNECT_SUCCESS);
    }

    /**
     * 채팅 요청 전송
     * @param targetId - SSE를 받는 대상 ID
     * @param event - 전송할 Event 내용
     * @return CommonResponse - 정상 상태코드와 메세지
     */
    @Override
    public CommonResponse chatRequestSend(Long targetId, Object event) {
        sendToClient(targetId, event);
        return responseService.successCommonResponse(ResponseStatus.CHAT_REQUEST_SUCCESS);
    }

    /**
     * 거리순으로 Picker 조회
     * @param picker - 현재 위치, Id, 반경이 포함된 Picker 정보
     * @return DataResponse<List>
     */
    @Override
    public DataResponse getPickerListByDistance(SearchPickerDto picker) {
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();

        // 현재위치로부터 반경 Distance(m)에 있는 Picker 리스트 조회
        GeoResults<RedisGeoCommands.GeoLocation<String>> radius = geoOperations.radius(CONNECT_SESSION, new Circle(picker.getPoint(), picker.getDistance()));

        HashSet<String> pickerList = new HashSet<>();

        // 반경 이내에 있는 Picker 인원 수
        int pickerSize = radius.getContent().size();

        // Max count 이하는 전부 반환
        if (pickerSize <= MAX_PICKER_COUNT) {
            radius.getContent().stream().forEach(value -> pickerList.add(value.getContent().getName()));
        } else { // Max Count 이상은 랜덤으로 15명 선택
            while (pickerList.size() < MAX_PICKER_COUNT) {
                int randomIdx = random.nextInt(pickerSize);
                GeoResult<RedisGeoCommands.GeoLocation<String>> value = radius.getContent().get(randomIdx);
                // 검색 결과에서 본인 제거
                if (value.getContent().getName().equals(picker.getMemberId().toString())) continue;

                pickerList.add(value.getContent().getName());
            }
        }
        return responseService.successDataResponse(ResponseStatus.CONNECTION_LIST_SEARCH_SUCCESS, pickerList);
    }

    /**
     * Server Push를 위한 SSE Emitter 생성 및 등록
     * @param memberId - SSE Emitter로 등록할 회원 아이디
     * @return SseEmitter - 생성한 Sse Emitter
     */
    private SseEmitter createEmitter(Long memberId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        sseEmitterRepository.put(memberId, emitter);

        emitter.onCompletion(() -> sseEmitterRepository.remove(memberId));
        emitter.onTimeout(() -> sseEmitterRepository.remove(memberId));

        return emitter;
    }

    /**
     * target에게 Server Sent Event 전송
     * @param targetId - SSE를 받는 대상 ID
     * @param data - Event 내용
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
