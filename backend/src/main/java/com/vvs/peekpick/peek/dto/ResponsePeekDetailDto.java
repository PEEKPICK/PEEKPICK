package com.vvs.peekpick.peek.dto;

import com.vvs.peekpick.entity.Avatar;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ResponsePeekDetailDto {
    private Long peekId;
    private Long memberId;
    //private Avatar avatar;
    private String content;
    private String imageUrl;
    private int likeCount;
    private int disLikeCount;
    private LocalDateTime finishTime;
    private boolean liked;
    private boolean disLiked;
}
