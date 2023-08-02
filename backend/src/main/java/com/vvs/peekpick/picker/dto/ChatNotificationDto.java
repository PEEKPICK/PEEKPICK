package com.vvs.peekpick.picker.dto;

import lombok.*;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatNotificationDto {
    private String roomId;
    private Long opponent;
}
