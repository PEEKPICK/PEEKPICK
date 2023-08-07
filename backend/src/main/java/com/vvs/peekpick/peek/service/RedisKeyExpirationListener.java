package com.vvs.peekpick.peek.service;

import lombok.AllArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;

@Component
public class RedisKeyExpirationListener implements MessageListener {

    @Override
    public void onMessage(Message message, byte[] pattern) {
        // Message body contains the expired key.
        String expiredKey = message.toString();

        // Extract peekId from the key.
        if (expiredKey.startsWith("Peek:")) {
            String peekId = expiredKey.split(":")[1];
            // TODO: 여기에서 필요한 로직을 수행하세요.
            System.out.println("Expired Peek Id: " + peekId);
        }
    }
}
