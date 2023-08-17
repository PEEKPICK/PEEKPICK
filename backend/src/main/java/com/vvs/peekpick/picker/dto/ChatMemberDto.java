package com.vvs.peekpick.picker.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ChatMemberDto {

    private Long senderId;
    private Long receiverId;

    @Builder
    public ChatMemberDto(Long senderId, Long receiverId) {
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
