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
import org.springframework.data.geo.GeoResults;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickerServiceImpl implements PickerService{

    private final String CONNECT_SESSION = "session";

    private final ResponseService responseService;
    private final PickerJpaRepository pickerJpaRepository;
    private final PickerRedisRepository pickerRedisRepository;
    private final RedisTemplate<String, String> redisTemplate;

    public CommonResponse connectSession(ConnectingPickerDto picker){
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
        geoOperations.add(CONNECT_SESSION, picker.getPoint(), picker.getMemberId().toString());
        return responseService.successCommonResponse(ResponseStatus.CONNECTING_SUCCESS);
    }

    @Override
    public DataResponse getPickerListByDistance(SearchPickerDto picker) {
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
        GeoResults<RedisGeoCommands.GeoLocation<String>> radius = geoOperations.radius(CONNECT_SESSION, new Circle(picker.getPoint(), picker.getDistance()));
        ArrayList<String> pickerList = new ArrayList<>();
        radius.getContent().stream().forEach(value -> pickerList.add(value.getContent().getName()));
        return responseService.successDataResponse(ResponseStatus.CONNECTION_LIST_SEARCH_SUCCESS, pickerList);
    }


}
