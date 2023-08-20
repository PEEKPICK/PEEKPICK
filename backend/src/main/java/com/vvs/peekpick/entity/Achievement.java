package com.vvs.peekpick.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long achievementId;

    private int chatCount;
    private int likeCount;
    private int disLikeCount;
    private int pickPoint;

    private LocalDateTime updateDate;
}
