package com.vvs.peekpick.picker.controller;

import com.vvs.peekpick.picker.dto.ChatMessageDto;
import com.vvs.peekpick.picker.dto.ChatRoomDto;
import com.vvs.peekpick.picker.service.ChatPublisher;
import com.vvs.peekpick.picker.service.ChatService;
import com.vvs.peekpick.picker.service.PickerService;
import com.vvs.peekpick.response.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ChatPublisher chatPublisher;
    private final PickerService pickerService;

    /**
     * WebSocket 에서 /pub/chat/publish 엔드포인트의 메시지를 처리하는 메서드
     */
    @MessageMapping("/chat/publish")
    public void message(ChatMessageDto messageDto) {
        ChatRoomDto chatRoomDto = chatService.getChatRoom(messageDto.getRoomId());
        if (LocalDateTime.now().isAfter(chatRoomDto.getCreateTime().plusMinutes(10))){
            // 10분 이후 메시지를 잠금
            messageDto.expiredMessage();

        }else {
            chatService.appendLog(messageDto);
        }
        chatPublisher.publish(chatRoomDto.getChannelTopic(), messageDto);
    }

    @GetMapping("/chat/members/{roomId}")
    public DataResponse<?> getMembersByRoomId(@PathVariable String roomId){
        return chatService.getMembersByRoomId(roomId);
    }
}
