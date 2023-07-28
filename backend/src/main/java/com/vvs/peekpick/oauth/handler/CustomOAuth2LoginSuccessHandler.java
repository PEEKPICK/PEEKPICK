package com.vvs.peekpick.oauth.handler;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.member.dto.SignUpDto;
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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final MemberRepository memberRepository;

    @Value("${auth.redirectUrl}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException{
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();

        // 이름 + provider로 조회
        Optional<Member> member = memberRepository.findByNameAndProvider(principalUser.getProviderUser(). getUsername(),
                principalUser.getProviderUser().getProvider());

        // 회원이 아니라면
        if (!member.isPresent()) {
            // 가회원 등록 및 redirect
            ProviderUser providerUser = principalUser.getProviderUser();
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

            log.info("signupMember={}", signupMember);
        } else {
            log.info("이미 있는 회원");
            redirectUrl = "http://localhost:3000/login";
        }
        log.info("url={}", redirectUrl);
        // 신규 회원이면 회원정보 return
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
    private static String getBirthday(ProviderUser providerUser) {
        String result = providerUser.getBirthYear() + "-" + providerUser.getBirthDay();
        if ("-".equals(result)) return null;
        return result;
    }
}