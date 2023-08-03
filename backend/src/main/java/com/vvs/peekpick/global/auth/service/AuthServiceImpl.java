package com.vvs.peekpick.global.auth.service;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.entity.RefreshToken;
import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.exception.ExceptionStatus;
import com.vvs.peekpick.global.auth.util.JwtTokenProvider;
import com.vvs.peekpick.member.repository.AvatarRepository;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.member.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AvatarRepository avatarRepository;
    private final MemberRepository memberRepository;

    @Override
    public String createAccessToken(String accessToken, String refreshToken) {
        accessToken = accessToken.replace("Bearer ", "");
        Long avatarId = jwtTokenProvider.getAvatarIdFromToken(accessToken);

        log.info("accessToken={}", accessToken);

        RefreshToken saveRefreshToken = refreshTokenRepository.findByAvatarId(avatarId)
                                                              .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_AVATAR));
        String stdToken = saveRefreshToken.getToken();

        log.info("Token1={}", stdToken);
        log.info("Token2={}", refreshToken);
        // refreshToken 값이 존재하고, DB와 값이 일치하지 않으면
        if (refreshToken.equals("") || !refreshToken.equals(stdToken)) {
            throw new CustomException(ExceptionStatus.NOT_MATCH_TOKEN);
        }
        log.info("OKOKOK");
        Member member = memberRepository.findByAvatarId(avatarId)
                                        .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_USER));

        return jwtTokenProvider.createAccessToken(member);
    }
}
