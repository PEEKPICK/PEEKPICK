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
    private static final String CONNECT_SESSION = "session";
    private static final String NOTIFY_SESSION = "notify_session";

    // 주변 최대 Picker 수
    private static final int MAX_PICKER_COUNT = 15;
    private static final Long EMITTER_TIMEOUT = 60L * 1000 * 60;

    private static final Random random = new Random();

    private final ResponseService responseService;
    private final PickerJpaRepository pickerJpaRepository;
    private final PickerRedisRepository pickerRedisRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final SseEmitterRepository sseEmitterRepository;

    /* 서비스 접속 시 세션에 추가 */
    @Override
    public SseEmitter connectSession(ConnectingPickerDto picker) {
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
        geoOperations.add(CONNECT_SESSION, picker.getPoint(), String.valueOf(picker.getMemberId()));

        SseEmitter emitter = createEmitter(picker.getMemberId());
        return emitter;
    }

    /* 백그라운드로 나가거나, 웹 종료시 세션에서 제거 */
    @Override
    public CommonResponse disconnectSession(ConnectingPickerDto picker) {
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
        geoOperations.remove(CONNECT_SESSION, picker.getMemberId().toString());
        return responseService.successCommonResponse(ResponseStatus.DISCONNECT_SUCCESS);
    }

    /* 거리순으로 Picker 조회 */
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

    /* 대상에게 채팅 요청 송신 */
    @Override
    public CommonResponse sendChatRequest(Long targetId, Object event) {
        sendToClient(targetId, event);
        return responseService.successCommonResponse(ResponseStatus.RESPONSE_SAMPLE);
    }

    /**
     * SSE 알림 수신을 위한 SSE Emitter 생성
     * @return SSE Emitter
     */
    private SseEmitter createEmitter(Long memberId){
        SseEmitter emitter = new SseEmitter(EMITTER_TIMEOUT);

        sseEmitterRepository.put(memberId, emitter);

        emitter.onCompletion(() -> sseEmitterRepository.remove(memberId));
        emitter.onTimeout(() -> sseEmitterRepository.remove(memberId));

        return emitter;
    }

    /**
     * SSE로 대상 SSE Emitter에게 메시지 전송
     */
    private void sendToClient(Long memberId, Object data) {
        SseEmitter emitter = sseEmitterRepository.get(memberId).orElseThrow(
                () -> new CustomException(ExceptionStatus.PICKER_SSE_DISCONNECTED)
        );
        
        // TODO 송신자의 ID를 통해 NICKNAME 함께 전송 필요
        try {
            emitter.send(SseEmitter.event().id(String.valueOf(memberId)).name("Chatting Request").data(data));
        } catch (Exception e){
            sseEmitterRepository.remove(memberId);
            emitter.completeWithError(e);
        }
    }
}
