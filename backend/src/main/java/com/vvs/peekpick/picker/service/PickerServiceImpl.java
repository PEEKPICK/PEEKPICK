package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.picker.dto.ConnectingPickerDto;
import com.vvs.peekpick.picker.dto.SearchPickerDto;
import com.vvs.peekpick.picker.repository.PickerJpaRepository;
import com.vvs.peekpick.picker.repository.PickerRedisRepository;
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

import java.util.HashSet;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickerServiceImpl implements PickerService {

    // Redis에 저장될 Key
    private final String CONNECT_SESSION = "session";

    // 주변 최대 Picker 수
    private final int MAX_PICKER_COUNT = 15;
    private final Random random = new Random();


    private final ResponseService responseService;
    private final PickerJpaRepository pickerJpaRepository;
    private final PickerRedisRepository pickerRedisRepository;
    private final RedisTemplate<String, String> redisTemplate;

    /* 서비스 접속 시 세션에 추가 */
    @Override
    public CommonResponse connectSession(ConnectingPickerDto picker) {
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
        geoOperations.add(CONNECT_SESSION, picker.getPoint(), picker.getMemberId().toString());
        return responseService.successCommonResponse(ResponseStatus.CONNECTING_SUCCESS);
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

}
