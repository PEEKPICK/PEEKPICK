package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class PeekDetailDto {
    private Long peekId;
    private String content;
    private String imageUrl;
    private int likeCount;
    private int disLikeCount;
    private LocalDateTime finishTime;
    private boolean liked;
    private boolean disLiked;
    private int distance;

}
