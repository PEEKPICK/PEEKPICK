package com.vvs.peekpick.picker.repository;

import com.vvs.peekpick.picker.service.ChatPublisher;
import com.vvs.peekpick.picker.service.ChatSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ChatRepository {

    // 채팅방에 발행되는 메시지를 처리할 Listener
    private final RedisMessageListenerContainer redisMessageListenerContainer;
    // 발행/구독 서비스
    private final ChatSubscriber chatSubscriber;
    private final ChatPublisher chatPublisher;

    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, Object> opsHashChannelTopic;
    private ListOperations<String, Object> opsListChat;

    // Redis 저장을 위한 Key 값
    private final static String CHAT_KEY = "CHATTING:";
    private final static String TOPIC = "TOPIC";

    @PostConstruct
    private void init(){
        opsHashChannelTopic = redisTemplate.opsForHash();
        opsListChat = redisTemplate.opsForList();
    }

    public String createChatRoom() {
        String roomId = UUID.randomUUID().toString();
        ChannelTopic topic = new ChannelTopic(roomId);
        redisMessageListenerContainer.addMessageListener(chatSubscriber, topic);
        opsHashChannelTopic.put(TOPIC, roomId, topic);
        return roomId;
    }

    public Optional<ChannelTopic> getTopic(String roomId) {
        return Optional.ofNullable((ChannelTopic) opsHashChannelTopic.get(TOPIC, roomId));
    }

    public void chatLogAppend(String message, String roomId) {
        opsListChat.rightPush(CHAT_KEY+roomId, message);
    }

    public List<Object> chatEnd(String roomId) {
        return opsListChat.range(CHAT_KEY+roomId, 0, -1);
    }
}
