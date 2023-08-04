package com.vvs.peekpick.picker.controller;

import com.vvs.peekpick.picker.dto.ChatMessageDto;
import com.vvs.peekpick.picker.service.ChatPublisher;
import com.vvs.peekpick.picker.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ChatPublisher chatPublisher;

    /**
     * WebSocket 에서 /pub/chat/publish 엔드포인트의 메시지를 처리하는 메서드
     */
    @MessageMapping("/chat/publish")
    public void message(ChatMessageDto messageDto) {
        ChannelTopic topic = chatService.getTopic(messageDto.getRoomId());
        chatPublisher.publish(topic, messageDto);
        chatService.appendLog(messageDto);
    }
}
