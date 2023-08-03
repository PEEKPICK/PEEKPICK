package com.vvs.peekpick.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PeekReaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long peekReactionId;

    private Long peekId;

    @Column(length = 1)
    private String type;

    private Long memberId;
}
