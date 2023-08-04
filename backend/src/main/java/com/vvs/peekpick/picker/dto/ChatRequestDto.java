package com.vvs.peekpick.picker.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRequestDto {

    private Long senderId;
    private LocalDateTime requestTime;

    public void setRequestTime(LocalDateTime requestTime) {
        this.requestTime = requestTime;
    }
}
