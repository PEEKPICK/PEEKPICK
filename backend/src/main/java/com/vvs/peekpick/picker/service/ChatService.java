package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.picker.dto.ChatMessageDto;
import com.vvs.peekpick.picker.dto.ChatRoomDto;
import com.vvs.peekpick.response.CommonResponse;
import org.springframework.data.redis.listener.ChannelTopic;

public interface ChatService {

    ChatRoomDto getChatRoom(String roomId);

    String createChatRoom(Long senderId, Long receiverId);

    CommonResponse exitChatRoom(String roomId);

    void appendLog(ChatMessageDto messageDto);
}
