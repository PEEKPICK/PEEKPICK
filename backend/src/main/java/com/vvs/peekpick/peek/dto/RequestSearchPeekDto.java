package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@RedisHash(value = "PeekLocation")
public class RequestSearchPeekDto {
    @Id
    private Point point; //경도, 위도
    private double distance;

    @Override
    public String toString() {
        return "SearchPeekDto{" +
                "point=" + point +
                ", distance=" + distance +
                '}';
    }
}
