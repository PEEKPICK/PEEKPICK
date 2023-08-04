package com.vvs.peekpick.peek.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor //, ObjectMapper 사용 위해 (ObjectMapper는 먼저 생성 후 필드 설정함)
public class PeekRedisDto {
    private Long peekId;
    private Long memberId;
    private String content;
    private String imageUrl;
    private int likeCount;
    private int disLikeCount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime writeTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime finishTime;

    private boolean special;
    private boolean viewed;
    private boolean liked;
    private boolean disLiked;

    @Override
    public String toString() {
        return "PeekDto{" +
                "peekId=" + peekId +
                ", memberId=" + memberId +
                ", content='" + content + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", likeCount=" + likeCount +
                ", disLikeCount=" + disLikeCount +
                ", writeTime=" + writeTime +
                ", finishTime=" + finishTime +
                ", special=" + special +
                ", viewed=" + viewed +
                ", liked=" + liked +
                ", disLiked=" + disLiked +
                '}';
    }
}