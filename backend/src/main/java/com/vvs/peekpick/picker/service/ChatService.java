package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.picker.dto.ChatMessageDto;
import com.vvs.peekpick.response.CommonResponse;
import org.springframework.data.redis.listener.ChannelTopic;

public interface ChatService {

    ChannelTopic getTopic(String roomId);

    String createChatRoom();

    CommonResponse exitChatRoom(String roomId);

    void appendLog(ChatMessageDto messageDto);
}
