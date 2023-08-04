package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ResponsePeekDto {
    private PeekDetailDto peekDetailDto;
    private PeekAvatarDto peekAvatarDto;
}
