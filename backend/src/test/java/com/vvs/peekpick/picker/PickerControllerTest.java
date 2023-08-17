//package com.vvs.peekpick.picker;
//
//import com.vvs.peekpick.picker.dto.ConnectingPickerDto;
//import com.vvs.peekpick.picker.service.PickerService;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.geo.Point;
//import org.springframework.data.redis.core.GeoOperations;
//import org.springframework.data.redis.core.RedisTemplate;
//
//import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
//
//@SpringBootTest
//class PickerControllerTest {
//
//    private final String CONNECT_SESSION = "session";
//
//    @AfterEach
//    void afterAll() {
//        redisTemplate.delete(CONNECT_SESSION);
//    }
//
//    @Autowired
//    private RedisTemplate<String, String> redisTemplate;
//
//    @Autowired
//    private PickerService pickerServiceImpl;
//
//    @Test
//    public void connectSessionTest(){
//        // Picker 접속
//        ConnectingPickerDto connectingPickerDto = new ConnectingPickerDto(1L, new Point( 146.9780, 37.5665));
//        pickerServiceImpl.connectSession(connectingPickerDto);
//
//        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();
//        // Picker 저장 여부 확인
//        Point findPoint = geoOperations.position(CONNECT_SESSION, connectingPickerDto.getMemberId().toString()).get(1);
//
//        assertThat(connectingPickerDto.getPoint()).isEqualTo(findPoint);
//
//    }
//}
