package com.vvs.peekpick.picker.repository;

import com.vvs.peekpick.picker.dto.ChatRoomDto;
import com.vvs.peekpick.picker.service.ChatPublisher;
import com.vvs.peekpick.picker.service.ChatSubscriber;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
@RequiredArgsConstructor
public class ChatRepository {

    // 채팅방에 발행되는 메시지를 처리할 Listener
    @Qualifier("redisMessageListenerContainer")
    private final RedisMessageListenerContainer redisMessageListenerContainer;
    // 발행/구독 서비스
    private final ChatSubscriber chatSubscriber;
    private final ChatPublisher chatPublisher;

    @Qualifier("commonRedisTemplate")
    private final RedisTemplate<String, Object> redisTemplate;
    @Qualifier("chatLogRedisTemplate")
    private final RedisTemplate<String, String> listRedisTemplate;
//    private ListOperations<String, Object> opsListChat;
    private ListOperations<String, String> opsListChat;
    private Map<String, ChatRoomDto> topics;

    // Redis 저장을 위한 Key 값
    private final static String CHAT_KEY = "CHATTING:";

    @PostConstruct
    private void init() {
        topics = new ConcurrentHashMap<>();
//        opsListChat = redisTemplate.opsForList();
        opsListChat = listRedisTemplate.opsForList();
    }

    public String createChatRoom(LocalDateTime now) {
        String roomId = UUID.randomUUID().toString();
        ChannelTopic topic = new ChannelTopic(roomId);
        ChatRoomDto chatRoomDto = ChatRoomDto.builder()
                .createTime(now)
                .channelTopic(topic)
                .build();
        redisMessageListenerContainer.addMessageListener(chatSubscriber, topic);
        try {
            topics.put(roomId, chatRoomDto);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return roomId;
    }

    public Optional<ChatRoomDto> getTopic(String roomId) {
        return Optional.ofNullable(topics.get(roomId));
    }

    public void deleteChatRoomByRoomId(String roomId) {
        topics.remove(roomId);
    }

    public void chatLogAppend(String message, String roomId) {
        log.info("=== ChatRepository === \n" +
                " Message : {} \n" +
                " RoomId : {} ", message, roomId);
        opsListChat.rightPush(CHAT_KEY + roomId, message);
    }

//    public List<Object> chatEnd(String roomId) {
//        List<Object> result = opsListChat.range(CHAT_KEY + roomId, 0, -1);
//        opsListChat.getOperations().delete(CHAT_KEY + roomId);
//        return result;
//    }

    public List<String> chatEnd(String roomId) {
        List<String> result = opsListChat.range(CHAT_KEY + roomId, 0, -1);
        opsListChat.getOperations().delete(CHAT_KEY + roomId);
        return result;
    }
}
