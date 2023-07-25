package com.vvs.peekpick.picker;

import com.vvs.peekpick.picker.dto.ConnectingPickerDto;
import com.vvs.peekpick.picker.dto.SearchPickerDto;
import com.vvs.peekpick.picker.service.PickerService;
import com.vvs.peekpick.response.DataResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class PickerTest {

    private final String CONNECT_SESSION = "session";
    // 주변 최대 Picker 수
    private final int MAX_PICKER_COUNT = 15;
    private final Random random = new Random();

    @AfterEach
    void afterAll() {
        redisTemplate.delete(CONNECT_SESSION);
    }

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private PickerService pickerServiceImpl;

    @Test
    public void connectSessionTest(){
        // Picker 접속
        ConnectingPickerDto connectingPickerDto = new ConnectingPickerDto(1L, new Point( 146.9780, 37.5665));
        pickerServiceImpl.connectSession(connectingPickerDto);

        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
        // Picker 저장 여부 확인
        Point findPoint = geoOperations.position(CONNECT_SESSION, connectingPickerDto.getMemberId().toString()).get(1);

        assertThat(connectingPickerDto.getPoint()).isEqualTo(findPoint);

    }

    @Test
    public void getPickerListByDistanceLessThanMaxCount(){
        SearchPickerDto searchPicker = new SearchPickerDto(5L, new Point(128.121, 36.121), 10000);
        ConnectingPickerDto picker1 = new ConnectingPickerDto(1L, new Point(128.123, 36.123));
        ConnectingPickerDto picker2 = new ConnectingPickerDto(2L, new Point(128.125, 36.125));
        ConnectingPickerDto picker3 = new ConnectingPickerDto(3L, new Point(128.127, 36.127));
        ConnectingPickerDto picker4 = new ConnectingPickerDto(4L, new Point(128.129, 36.129));

        pickerServiceImpl.connectSession(picker1);
        pickerServiceImpl.connectSession(picker2);
        pickerServiceImpl.connectSession(picker3);
        pickerServiceImpl.connectSession(picker4);

        Set<String> pickerListByDistance = (HashSet) pickerServiceImpl.getPickerListByDistance(searchPicker).getData();
        assertThat(pickerListByDistance.size()).isEqualTo(4);

    }
}
