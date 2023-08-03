package com.vvs.peekpick.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Avatar {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    List<Taste> tasteList;

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
}
