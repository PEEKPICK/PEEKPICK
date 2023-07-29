package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RequestPeekDto {
    private PeekLocationDto peekLocationDto;
    private PeekDto peekDto;
}
