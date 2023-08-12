package com.vvs.peekpick.peek.dto;

import com.vvs.peekpick.entity.Emoji;
import com.vvs.peekpick.entity.Prefix;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

// 아바타 조회 DTO
// Likes, DisLike 구분을 위해 필요
@Getter
@Builder
@AllArgsConstructor
public class PeekAvatarDto {
    private String nickname;
    private String bio;

    private Emoji emoji;
    private Prefix prefix;
}

