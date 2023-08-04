package com.vvs.peekpick.oauth.handler;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.global.auth.util.JwtTokenProvider;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.oauth.model.PrincipalUser;
import com.vvs.peekpick.oauth.model.ProviderUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${auth.redirectUrl}")
    private String redirectUrl;

    // 23.07.29 잘못 설계된 OAuth User 정책으로 망한 로직
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException{
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        ProviderUser providerUser = principalUser.getProviderUser();

        // 이름 + provider로 조회
        Optional<Member> member = memberRepository.findByNameAndProvider(principalUser.getUsername(),
                providerUser.getProvider());

        // 회원이 아니라면
        if (!member.isPresent()) {
            // 가회원 등록 및 redirect
            Member newMember = Member.builder()
                            .name(providerUser.getUsername())
                            .provider(providerUser.getProvider())
                            .email(providerUser.getEmail())
                            .gender(providerUser.getGender())
                            .phone(providerUser.getPhoneNumber())
                            .birthday(getBirthday(providerUser))
                            .build();

            Member signupMember = memberRepository.save(newMember);
            redirectUrl += "?id=" + signupMember.getMemberId();
        } else {
            Member findMember = member.get();

            // 가회원 상태 = 회원가입 리다이렉션
            if(findMember.getAvatar() == null) {
                log.info("NO Avatar");
                redirectUrl += "userinfo?id=" + findMember.getMemberId();
            }

            // 회원 상태 = Token 발급 및 로그인 처리
            else {
                log.info("가입 회원");
                String accessToken = jwtTokenProvider.createAccessToken(member.get());
                String refreshToken = jwtTokenProvider.createRefreshToken();

                // refreshToken 은 쿠키
                Cookie cookie = getCookie(refreshToken);
                response.addCookie(cookie);

                // accessToken 은 파라미터에 임시, 맘에 안든다
                redirectUrl = "http://localhost:3000/oauth2/redirect?token=" + accessToken;
            }
        }
        // 신규 회원이면 회원정보 return
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }

    private static Cookie getCookie(String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24 * 365); // 1년
        return cookie;
    }

    private static String getBirthday(ProviderUser providerUser) {
        if (providerUser.getBirthDay() == null || providerUser.getBirthYear() == null) return null;
        String result = providerUser.getBirthYear() + "-" + providerUser.getBirthDay();
        return result;
    }
}