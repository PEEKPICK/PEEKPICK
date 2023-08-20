package com.vvs.peekpick.member.controller;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.entity.RefreshToken;
import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.exception.ExceptionStatus;
import com.vvs.peekpick.global.auth.util.CookieUtil;
import com.vvs.peekpick.global.auth.util.JwtTokenProvider;
import com.vvs.peekpick.member.dto.SignUpDto;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.member.repository.RefreshTokenRepository;
import com.vvs.peekpick.member.service.MemberService;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RestController
@Transactional
@RequiredArgsConstructor
public class TestMemberController {
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final ResponseService responseService;
    private final JwtTokenProvider jwtTokenProvider;

    // TODO 23.08.01 OAuth 뚫리기 전 테스트 계정

    // 테스트 계정 생성
    @PostMapping("/member/test")
    public CommonResponse testSignup(@RequestBody SignUpDto signUpDto) {
        memberService.createMember(signUpDto);

        return responseService.successCommonResponse(ResponseStatus.RESPONSE_OK);
    }

    // 테스트 계정 로그인
    @PostMapping("/member/login")
    public DataResponse testLogin(@RequestParam String id, HttpServletResponse response) throws IOException {

        // 1. 토큰 생성
        id += "@test.com";
        log.info("email={}", id);
        Member member = memberRepository.findByEmail(id).orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_USER));
        String accessToken = jwtTokenProvider.createAccessToken(member);
        String refreshToken = jwtTokenProvider.createRefreshToken();

        Long avatarId = member.getAvatar().getAvatarId();
        Optional<RefreshToken> token = refreshTokenRepository.findByAvatarId(avatarId);

        // 이미 있으면
        if (token.isPresent()) {
            // update
            refreshTokenRepository.updateTokenByAvatarId(refreshToken, avatarId);
        } else {
            RefreshToken newToken = RefreshToken.builder()
                                                .avatar(member.getAvatar())
                                                .token(refreshToken).build();

            refreshTokenRepository.save(newToken);
        }

        CookieUtil.createCookie(response, refreshToken);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, accessToken);
    }
}
