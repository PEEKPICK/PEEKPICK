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
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();

        Optional<Member> member = memberRepository.findByNameAndProvider(principalUser.getProviderUser(). getUsername(),
                principalUser.getProviderUser().getProvider());

        // 회원이 아니라면
        if (!member.isPresent()) {
            ProviderUser providerUser = principalUser.getProviderUser();
            log.info("providerUser={}", providerUser);
            log.info("providerUser={}", providerUser.getUsername());
            try {
                String encryptedEmail = providerUser.getEmail() != null ? encrypt(providerUser.getEmail()) : null;
                String encryptedName = providerUser.getUsername() != null ? encrypt(providerUser.getUsername()) : null;
                String encryptedPhone = providerUser.getPhoneNumber() != null ? encrypt(providerUser.getPhoneNumber()) : null;
                String encryptedGender = providerUser.getGender() != null ? encrypt(providerUser.getGender()) : null;

                redirectUrl += "?";
                if(encryptedEmail != null) {
                    redirectUrl += "email=" + encryptedEmail + "&";
                }
                if(encryptedName != null) {
                    redirectUrl += "name=" + encryptedName + "&";
                }
                if(encryptedPhone != null) {
                    redirectUrl += "phone=" + encryptedPhone + "&";
                }
                if(encryptedGender != null) {
                    redirectUrl += "gender=" + encryptedGender;
                }

                if(redirectUrl.endsWith("&")) {
                    redirectUrl = redirectUrl.substring(0, redirectUrl.length() - 1); // Remove trailing '&'
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            response.getWriter().write(member.toString());
        }

        // 신규 회원이면 회원정보 return
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }

    private String encrypt(String data) throws Exception {
        Key key = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedData = cipher.doFinal(data.getBytes());

        return Base64.encodeBase64String(encryptedData);
    }
}
