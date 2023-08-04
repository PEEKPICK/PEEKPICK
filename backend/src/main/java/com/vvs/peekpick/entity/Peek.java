package com.vvs.peekpick.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Peek {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long peekId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String content;

    private int disLikeCount;

    private int likeCount;

    private String imageUrl;

    private LocalDateTime writeTime;

    public void updateCounts(int like, int dislike) {
        this.likeCount = like;
        this.disLikeCount = dislike;
    }

}
