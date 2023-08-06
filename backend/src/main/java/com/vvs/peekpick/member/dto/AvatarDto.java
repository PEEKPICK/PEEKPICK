package com.vvs.peekpick.member.dto;

import com.vvs.peekpick.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

// 아바타 조회 DTO
// Likes, DisLike 구분을 위해 필요
@Getter
@Builder
@AllArgsConstructor
public class AvatarDto {
    private Long avatarId;
    private String nickname;
    private String bio;

    private Emoji emoji;
    private Prefix prefix;
    private World world;

    private List<Category> likes;
    private List<Category> disLikes;

    private int chatCount;
    private int likeCount;
    private int pickPoint; // 활동 지표
}

