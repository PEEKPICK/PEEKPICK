package com.vvs.peekpick.oauth.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomOAuth2LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Value("${auth.secretKey}")
    private String redirectURL;

    // 23.08.02 OAuth 인증 실패 시 home Redirect
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        getRedirectStrategy().sendRedirect(request, response, redirectURL);
    }
}
