package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekExpiredEventDto;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class PeekRedisExpirationPublisher implements MessageListener {
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String expiredKey = message.toString();
        PeekExpiredEventDto event = new PeekExpiredEventDto(expiredKey);
        eventPublisher.publishEvent(event);
    }
}
