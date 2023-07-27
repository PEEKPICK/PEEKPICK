package com.vvs.peekpick.oauth.handler;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.member.dto.SignUpDto;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.oauth.model.PrincipalUser;
import com.vvs.peekpick.oauth.model.ProviderUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final MemberRepository memberRepository;
    private static String SECRET_KEY = "PEIKPECKPEIKPECK";
    private String redirectUrl = "http://localhost:3000/userinfo";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException{
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();

        Optional<Member> member = memberRepository.findByNameAndProvider(principalUser.getProviderUser(). getUsername(),
                principalUser.getProviderUser().getProvider());

        // 회원이 아니라면
        if (!member.isPresent()) {
            ProviderUser providerUser = principalUser.getProviderUser();
            log.info("providerUser={}", providerUser);
            log.info("providerUser={}", providerUser.getUsername());

            // 맘에 안드는 로직
            try {
                getRedirectUrl(providerUser);
            } catch (IOException | GeneralSecurityException e) {
                throw new RuntimeException(e);
            }
        } else {
            response.getWriter().write(member.toString());
        }

        log.info("redirectUrl={}", redirectUrl);
        // 신규 회원이면 회원정보 return
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }

    private void getRedirectUrl(ProviderUser providerUser) throws IOException, GeneralSecurityException {
        StringBuilder urlBuilder = new StringBuilder(redirectUrl);

        urlBuilder.append("?");
        urlBuilder.append(getQueryString("email", providerUser.getEmail()));
        urlBuilder.append(getQueryString("name", providerUser.getUsername()));
        urlBuilder.append(getQueryString("phone", providerUser.getPhoneNumber()));
        urlBuilder.append(getQueryString("gender", providerUser.getGender()));

        urlBuilder.append("provider").append(providerUser.getProvider());

        if(urlBuilder.toString().endsWith("&")) {
            urlBuilder.setLength(urlBuilder.length() - 1); // Remove trailing '&'
        }

        redirectUrl = urlBuilder.toString();
    }

    private String getQueryString(String key, String value) {
        return Optional.ofNullable(value)
                .map(v -> {
                    try {
                        return encrypt(v);
                    } catch (IOException | GeneralSecurityException e) {
                        throw new RuntimeException(e);
                    }
                })
                .map(encrypted -> key + "=" + encrypted + "&")
                .orElse("");
    }


    private String encrypt(String data) throws IOException, GeneralSecurityException {
        Key key = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        String encodedString = Base64.encodeBase64String(encryptedData);

        return URLEncoder.encode(encodedString, StandardCharsets.UTF_8.toString());
    }
}