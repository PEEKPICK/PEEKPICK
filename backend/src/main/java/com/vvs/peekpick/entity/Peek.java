package com.vvs.peekpick.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Peek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long peekId;

    private Long memberId;

    private String content;

    private String imageUrl;

    private int likeCount;

    private int disLikeCount;

    private LocalDateTime writeTime;

}
