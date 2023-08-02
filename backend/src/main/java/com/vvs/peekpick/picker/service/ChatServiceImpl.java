package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.entity.Chat;
import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.exception.ExceptionStatus;
import com.vvs.peekpick.picker.repository.ChatJpaRepository;
import com.vvs.peekpick.picker.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final ChatJpaRepository chatJpaRepository;

    /**
     * Redis Pub/Sub 을 위한 채팅방 (Topic) 획득 함수
     * @param roomId - 채팅방 UUID
     */
    public ChannelTopic getTopic(String roomId) {
        return chatRepository.getTopic(roomId).orElseThrow(
                () -> new CustomException(ExceptionStatus.CHAT_ROOM_DOES_NOT_EXIST)
        );
    }

    /**
     * 채팅방을 생성하고 추후 로그 저장을 위해 RDB에도 생성
     * @return roomId - 채팅방 UUID
     */
    @Override
    public String createChatRoom() {
        String roomId = chatRepository.createChatRoom();

        Chat chatLog = Chat.builder()
                .roomId(roomId)
                .build();

        chatJpaRepository.save(chatLog);
        return roomId;
    }
}
