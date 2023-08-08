package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekExpiredEventDto;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class PeekRedisExpirationSubscriber  {
    private final PeekRedisService peekRedisService;

    @EventListener
    public void onPeekExpiredEvent(PeekExpiredEventDto event) {
        if (event.getExpiredKey().startsWith(PeekRedisServiceImpl.PEEK_REDIS)) {
            String peekId = event.getExpiredKey().split(":")[1];
            System.out.println(peekId+" : 만료");
            peekRedisService.deletePeekLocation(Long.parseLong(peekId));
        }
    }
}
