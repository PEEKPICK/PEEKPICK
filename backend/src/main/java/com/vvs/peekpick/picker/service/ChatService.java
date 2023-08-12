package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.picker.dto.ChatMessageDto;
import com.vvs.peekpick.picker.dto.ChatRoomDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import org.springframework.data.redis.listener.ChannelTopic;

import java.time.LocalDateTime;

public interface ChatService {

    ChatRoomDto getChatRoom(String roomId);

    String createChatRoom(Long senderId, Long receiverId, LocalDateTime now);

    CommonResponse exitChatRoom(String roomId);

    void appendLog(ChatMessageDto messageDto);

    DataResponse<?> getMembersByRoomId(String roomId);
}
