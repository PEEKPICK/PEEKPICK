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
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long achievementId;

    private int chatCount;
    private int likeCount;
    private int disLikeCount;
    private int pickPoint;
    private LocalDateTime updateDate;
}
