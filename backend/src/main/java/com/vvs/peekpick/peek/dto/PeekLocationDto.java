package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@AllArgsConstructor
@RedisHash(value = "PeekLocation")
public class PeekLocationDto {
    @Id
    private Long peekId;
    private Point point; //경도, 위도

}
