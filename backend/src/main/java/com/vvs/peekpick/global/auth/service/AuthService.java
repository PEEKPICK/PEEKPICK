package com.vvs.peekpick.global.auth.service;

public interface AuthService {
    String createAccessToken(String accessToken, String refreshToken);
}
