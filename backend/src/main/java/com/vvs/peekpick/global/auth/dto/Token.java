package com.vvs.peekpick.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Token {
    private String accessToken;
    private String refreshToken;
}
