package com.vvs.peekpick.picker.controller;

import com.vvs.peekpick.picker.dto.ConnectingPickerDto;
import com.vvs.peekpick.picker.dto.SearchPickerDto;
import com.vvs.peekpick.picker.service.PickerService;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/picker")
@RequiredArgsConstructor
public class PickerController {

    private final PickerService pickerServiceImpl;

    private static final String CHAT_REQUEST = "chat_request";

    /**
     * 접속시 서버 세션에 내 정보 추가
     * 접속시 서버푸시 알림 수신을 위한 Emitter 등록
     * @return SSE Emitter
     */
    @PostMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter connectSession(@RequestBody ConnectingPickerDto picker){
        return pickerServiceImpl.connectSession(picker);
    }

    @GetMapping(value = "/temp/{memberId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter connect(@PathVariable Long memberId){
        log.info("Called!!!!!!");
        ConnectingPickerDto picker = ConnectingPickerDto.builder()
                .memberId(memberId)
                .point(new Point(123.123, 45.45)
                ).build();
        return pickerServiceImpl.connectSession(picker);
    }

    /**
     * 접속 종료 혹은 홈으로 이동시 세션에서 내 정보 제거
     * @return CommonResponse
     */
    @PostMapping("/disconnect")
    public CommonResponse disconnectSession(@RequestBody ConnectingPickerDto picker) {
        return pickerServiceImpl.disconnectSession(picker);
    }

    /**
     * 내 위치로부터 설정한 거리 이내 PICKER 조회
     * @return DataResponse<List>
     */
    @PostMapping
    public DataResponse<List> getPickerListByDistance(@RequestBody SearchPickerDto picker) {
        return pickerServiceImpl.getPickerListByDistance(picker);
    }

    /**
     * 대상에게 채팅 요청 알림 송신
     * @return CommonResponse
     */
    @PostMapping("/chat-request/{targetId}")
    public CommonResponse sendChatRequest(@PathVariable Long targetId){
        return pickerServiceImpl.sendChatRequest(targetId, CHAT_REQUEST);
    }
}
