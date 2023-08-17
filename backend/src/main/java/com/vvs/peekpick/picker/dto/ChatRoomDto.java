package com.vvs.peekpick.picker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {

    private ChannelTopic channelTopic;
    private LocalDateTime createTime;
}
