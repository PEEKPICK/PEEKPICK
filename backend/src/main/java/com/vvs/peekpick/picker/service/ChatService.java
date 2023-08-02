package com.vvs.peekpick.picker.service;

import org.springframework.data.redis.listener.ChannelTopic;

public interface ChatService {

    ChannelTopic getTopic(String roomId);

    String createChatRoom();
}
