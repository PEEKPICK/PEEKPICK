package com.vvs.peekpick.entity;

import com.vvs.peekpick.member.dto.AvatarDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Avatar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long avatarId;

    private String nickname;
    private String bio;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "emoji_id")
    private Emoji emoji;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "prefix_id")
    private Prefix prefix;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "world_id")
    private World world;

    @OneToMany(mappedBy = "avatar")
    private List<Taste> tasteList;

    // 문자열 변환
    @Override
    public String toString() {
        return "Avatar{" +
                "avatarId=" + avatarId +
                ", nickname='" + nickname + '\'' +
                ", bio='" + bio + '\'' +
                ", emoji=" + emoji +
                ", prefix=" + prefix +
                ", world=" + world +
                ", tasteList=" + tasteList +
                '}';
    }

    public void updateAvatarInfo(Prefix prefix, String nickname, String bio) {
        this.prefix = prefix;
        this.nickname = nickname;
        this.bio = bio;
    }

    public void updateEmoji(Emoji emoji) {
        this.emoji = emoji;
    }

    // 취향 태그를 좋아요, 싫어요 분리
    public AvatarDto toAvatarDto(Achievement achievement) {
        List<String> likes = new ArrayList<>();
        List<String> disLikes = new ArrayList<>();

        for (Taste taste : this.tasteList) {
            if ("L".equals(taste.getType())) {
                likes.add(taste.getCategory().getMiddle());
            } else {
                disLikes.add(taste.getCategory().getMiddle());
            }
        }

        // 23.08.04 굉장히 마음에 안드는 로직
        return AvatarDto.builder()
                .avatarId(this.avatarId)
                .nickname(this.nickname)
                .bio(this.bio)
                .emoji(this.emoji)
                .prefix(this.prefix)
                .world(this.world)
                .likes(likes)
                .disLikes(disLikes)
                .chatCount(achievement.getChatCount())
                .likeCount(achievement.getLikeCount())
                .pickPoint(achievement.getPickPoint())
                .build();
    }

}
