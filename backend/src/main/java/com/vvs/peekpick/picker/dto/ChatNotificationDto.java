package com.vvs.peekpick.picker.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatNotificationDto {
    private String roomId;
    private LocalDateTime createTime;
    private LocalDateTime endTime;
    private Long opponent;
}
