package com.vvs.peekpick.peek.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.vvs.peekpick.entity.Peek;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
public class PeekRdbDto {
    private Long peekId;
    private Long memberId;
    private String content;
    private int disLikeCount;
    private int likeCount;
    private String imageUrl;
    private LocalDateTime writeTime;

    @Override
    public String toString() {
        return "PeekRdbDto{" +
                "peekId=" + peekId +
                ", memberId=" + memberId +
                ", content='" + content + '\'' +
                ", disLikeCount=" + disLikeCount +
                ", likeCount=" + likeCount +
                ", imageUrl='" + imageUrl + '\'' +
                ", writeTime=" + writeTime +
                '}';
    }
}