package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@AllArgsConstructor
@RedisHash(value = "PeekLocation")
public class PeekLocationDto {

    private Long memberId;
    private double latitude;
    private double longitude;

}
