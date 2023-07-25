package com.vvs.peekpick.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Entity
@Builder
@AllArgsConstructor
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
