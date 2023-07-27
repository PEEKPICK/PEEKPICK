package com.vvs.peekpick.member.dto;

import com.vvs.peekpick.entity.Emoji;
import com.vvs.peekpick.entity.Prefix;
import com.vvs.peekpick.entity.Taste;
import com.vvs.peekpick.entity.World;
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

    private List<Taste> likes;
    private List<Taste> disLikes;

    public AvatarDto create(long avatarId, String nickname, String bio, Emoji emoji,
                            Prefix prefix, World world, List<Taste> likes, List<Taste> disLikes) {

        return AvatarDto.builder()
                .avatarId(avatarId)
                .nickname(nickname)
                .bio(bio)
                .emoji(emoji)
                .prefix(prefix)
                .world(world)
                .likes(likes)
                .disLikes(disLikes)
                .build();
    }
}

