package com.vvs.peekpick.global.filter;

import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.global.auth.util.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public static final String TOKEN_EXCEPTION_KEY = "exception";
    public static final String TOKEN_INVALID = "invalid";
    public static final String TOKEN_EXPIRE = "expire";
    public static final String TOKEN_UNSUPPORTED = "unsupported";
    public static final String TOKEN_ILLEGAL = "illegal";
    public static final String CUSTOM_EXCEPTION = "custom";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            log.info("==== start =====");
            String accessToken = getAccessToken(request);
            log.info("==== AccessToken={} =====", accessToken);
            // AccessToken 유효성 검사
            if (StringUtils.hasText(accessToken) && jwtTokenProvider.validateToken(accessToken)) {
                log.info("===== Token OK =====");
                // AccessToken에서 기존 값 꺼내기
                Long avatarId = jwtTokenProvider.getIdFromToken(accessToken, "avatarId");
                Long memberId = jwtTokenProvider.getIdFromToken(accessToken, "memberId");
                log.info("memberId={}", memberId);
                log.info("avatarId={}", avatarId);

                // avatarId만 넘겨준다.
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(avatarId, memberId, null);

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                log.info("===== END =====");
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }  catch (MalformedJwtException e) {
            log.info("유효하지 않은 토큰입니다.");
            request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_INVALID);
        } catch (ExpiredJwtException e) {
            log.info("만료된 토큰입니다.");
            request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_EXPIRE);
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않는 토큰입니다.");
            request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_UNSUPPORTED);
        } catch (IllegalStateException e) {
            log.info("잘못된 토큰입니다.");
            request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_ILLEGAL);
        } catch (CustomException e) {
            log.info("커스텀 예외");
            request.setAttribute(TOKEN_EXCEPTION_KEY, CUSTOM_EXCEPTION);
        } catch (Exception e) {
            log.info("올바르지 않은 토큰입니다.={}", request.getRequestURL());
            request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_INVALID);
        }

        // 다음 필터
        filterChain.doFilter(request, response);
    }

    private static String getAccessToken(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.replace("Bearer ", "");

        return accessToken;
    }
}
