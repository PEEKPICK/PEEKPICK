package com.vvs.peekpick.peek.service;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

@Service
public class RedisExpiredEventListener implements MessageListener {

    @Override
    public void onMessage(Message message, byte[] pattern) {
        // 메시지 본문에서 키 이름 추출
        String expiredKey = new String(message.getBody());
        System.out.println("Expired Key: " + expiredKey);
    }
}
