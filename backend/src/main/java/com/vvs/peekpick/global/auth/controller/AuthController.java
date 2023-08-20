package com.vvs.peekpick.global.auth.controller;

import com.vvs.peekpick.entity.Avatar;
import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.entity.RefreshToken;
import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.exception.ExceptionStatus;
import com.vvs.peekpick.global.auth.service.AuthService;
import com.vvs.peekpick.global.auth.util.CookieUtil;
import com.vvs.peekpick.global.auth.util.JwtTokenProvider;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.member.repository.RefreshTokenRepository;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final ResponseService responseService;
    private final AuthService authService;
    private final String REFRESH_TOKEN = "refreshToken";

    @PostMapping("/refresh")
    public DataResponse renewAccessToken(HttpServletRequest request) {
        String accessToken = getAccessToken(request);

        // Cookie -> RefreshToken
        Cookie cookie = CookieUtil.getCookie(request, REFRESH_TOKEN)
                                  .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_MATCH_TOKEN));

        String refreshToken = cookie.getValue();
        String newToken = authService.createAccessToken(accessToken, refreshToken);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_CREATE, newToken);
    }

    private static String getAccessToken(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");
        return accessToken;
    }
}
