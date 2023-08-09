package com.vvs.peekpick.picker.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vvs.peekpick.picker.dto.ChatMessageDto;
import com.vvs.peekpick.wordFilter.BadWordFiltering;
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
    @Qualifier("commonRedisTemplate")
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;
    private final BadWordFiltering filtering = new BadWordFiltering("♡");

    /**
     * 메시지가 발행되면 해당 메시지를 처리
     * /sub/chat/room/{roomId} 를 구독중인 리스너가 메시지 수신
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishedMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
//            log.info("=== PublishedMessage {} ===", publishedMessage);
//            String afterFiltering = filtering.changeAll(publishedMessage);
//            log.info("=== After Filtering {} ===", afterFiltering);
            ChatMessageDto messageDto = objectMapper.readValue(publishedMessage, ChatMessageDto.class);
            log.info("=== Message in Subscriber {} ===", messageDto.getMessage());
            log.info("=== RoomId {} ===", messageDto.getRoomId());
            messagingTemplate.convertAndSend("/sub/chat/room/"+messageDto.getRoomId(), messageDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
