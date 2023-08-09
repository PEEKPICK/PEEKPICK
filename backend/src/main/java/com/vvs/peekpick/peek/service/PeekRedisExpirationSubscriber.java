package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekExpiredEventDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class PeekRedisExpirationSubscriber  {
    private final PeekService peekService;

    @EventListener
    public void onPeekExpiredEvent(PeekExpiredEventDto event) {
        if (event.getExpiredKey().startsWith(PeekRedisServiceImpl.PEEK_REDIS)) {
            System.out.println(event.getExpiredKey().split(":"));
            String peekId = event.getExpiredKey().split(":")[1];
            log.info("Peek Id : {} TTL Expired", peekId);
            peekService.deletePeekExpired(Long.parseLong(peekId));
        }
    }
}
