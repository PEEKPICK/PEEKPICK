package com.vvs.peekpick.picker.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vvs.peekpick.picker.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    @Qualifier("redisTemplate")
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;


    /**
     * 메시지가 발행되면 해당 메시지를 처리
     * /sub/chat/room/{roomId} 를 구독중인 리스너가 메시지 수신
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishedMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            ChatMessageDto messageDto = objectMapper.readValue(publishedMessage, ChatMessageDto.class);
            messagingTemplate.convertAndSend("/sub/chat/room/"+messageDto.getRoomId(), messageDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
