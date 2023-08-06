package com.vvs.peekpick.picker.controller;

import com.vvs.peekpick.picker.dto.ChatRequestDto;
import com.vvs.peekpick.picker.dto.ChatResponseDto;
import com.vvs.peekpick.picker.dto.ConnectingPickerDto;
import com.vvs.peekpick.picker.dto.SearchPickerDto;
import com.vvs.peekpick.picker.service.ChatService;
import com.vvs.peekpick.picker.service.PickerService;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/picker")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PickerController {

    private final PickerService pickerServiceImpl;
    private final ChatService chatServiceImpl;

    /**
     * 접속시 세션에 내 위치정보 저장
     * @return CommonResponse
     */
    @PostMapping(value = "/connect")
    public CommonResponse connectSession(@RequestBody ConnectingPickerDto picker, Authentication authentication){
        picker.setAvatarId(Long.parseLong(authentication.getName()));
        return pickerServiceImpl.connectSession(picker);
    }

    /**
     * 서버푸시를 위한 SSE Emitter 수신
     * @Return SSE Emitter
     */
    @GetMapping(value = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter sseConnect(Authentication authentication){
        log.info("=== Picker Controller : {} ===", authentication.getName());
        return pickerServiceImpl.connectSseSession(Long.parseLong(authentication.getName()));

    }

    /**
     * 종료하거나 홈으로 이동시 세션에서 내 정보 제거
     * @return CommonResponse
     */
    @GetMapping("/disconnect")
    public CommonResponse disconnectSession(Authentication authentication) {
        return pickerServiceImpl.disconnectSession(Long.parseLong(authentication.getName()));
    }

    /**
     * 내 위치로부터 설정한 거리 이내의 PICKER LIST 조회
     * @return DataResponse<List>
     */
    @PostMapping
    public DataResponse<List> getPickerListByDistance(@RequestBody SearchPickerDto picker, Authentication authentication) {
        picker.setAvatarId(Long.parseLong(authentication.getName()));
        return pickerServiceImpl.getPickerListByDistance(picker);
    }

    /**
     * 채팅 요청 전송
     * @return CommonResponse
     */
    @GetMapping("chat-request/{targetId}")
    public CommonResponse chatRequestSend(@PathVariable Long targetId, Authentication authentication){
        return pickerServiceImpl.chatRequestSend(targetId, Long.parseLong(authentication.getName()));
    }

    /**
     * 채팅 요청 수락 또는 거절
     * @Return CommonResponse
     */
    @PostMapping("chat-response")
    public DataResponse<?> chatResponseReceive(@RequestBody ChatResponseDto chatResponseDto){
        return pickerServiceImpl.chatResponseReceive(chatResponseDto);
    }

    /**
     * 채팅방 나가기
     *
     * @param roomId - 나간 채팅방 ID
     * @return CommonResponse
     */
    @PostMapping("chat-end")
    public CommonResponse exitChatRoom(@RequestBody String roomId) {
        return chatServiceImpl.exitChatRoom(roomId);
    }
}
