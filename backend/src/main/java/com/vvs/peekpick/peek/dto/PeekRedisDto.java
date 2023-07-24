package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@RedisHash(value = "PeekRedis")
public class PeekRedisDto {

    private Long peekId;
    private Long memberId;
    private String content;
    private String imageUrl;
    private int likeCount;
    private int disLikeCount;
    private LocalDateTime writeTime;

}
