package com.vvs.peekpick.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class World {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long worldId;

    private String openUrl;
    private String closeUrl;
}
