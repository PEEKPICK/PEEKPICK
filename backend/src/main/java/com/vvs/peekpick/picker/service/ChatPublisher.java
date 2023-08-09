package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.picker.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatPublisher {
    @Qualifier("commonRedisTemplate")
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * Topic (채팅방 ID)에 대해 메시지를 발행
     * @param topic - 채널 ( 채팅방 ID )
     */
    public void publish(ChannelTopic topic, ChatMessageDto messageDto){
        // 전송 시각 - 서버시간으로 적용
        messageDto.setSendTime(LocalDateTime.now().toString());
        log.info("=== Message in Publisher {} ===", messageDto.getMessage());
        log.info("=== Topic {} ===", topic);
        redisTemplate.convertAndSend(topic.getTopic(), messageDto);
    }
}
