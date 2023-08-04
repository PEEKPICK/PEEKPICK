package com.vvs.peekpick.picker.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatResponseDto {

    private Long requestSenderId;
    private Long requestReceiverId;
    private LocalDateTime requestTime;
    private String response;

}
