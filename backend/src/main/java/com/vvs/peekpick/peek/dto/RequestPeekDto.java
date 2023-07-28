package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RequestPeekDto {
    private PeekLocationDto peekLocationDto;
    private PeekDto peekDto;
}
