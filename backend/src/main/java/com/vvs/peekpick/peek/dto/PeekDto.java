package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@RedisHash(value = "Peek")
public class PeekDto implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private Long peekId;
    private Long memberId;
    private String content;
    private String imageUrl;
    private int likeCount;
    private int disLikeCount;
    private LocalDateTime writeTime;
    
}
