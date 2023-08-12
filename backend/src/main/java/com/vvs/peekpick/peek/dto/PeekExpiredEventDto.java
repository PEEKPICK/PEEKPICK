package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PeekExpiredEventDto {
    private final String expiredKey;

    public String getExpiredKey() {
        return expiredKey;
    }
}
