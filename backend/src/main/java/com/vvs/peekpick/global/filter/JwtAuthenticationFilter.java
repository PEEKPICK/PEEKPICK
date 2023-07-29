package com.vvs.peekpick.global.filter;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.exception.ExceptionStatus;
import com.vvs.peekpick.global.auth.JwtTokenProvider;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.oauth.model.PrincipalUser;
import io.netty.util.internal.StringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = request.getHeader("Authorization");

        // AccessToken이 존재하고, 만료시간이 남아있다면
        if (StringUtils.hasText(accessToken) && jwtTokenProvider.validateToken(accessToken)) {
            Long memberId = jwtTokenProvider.getUserIdFromToken(accessToken);

            // memberId만 넘겨준다.
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(memberId, null, null);
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 다음 필터
        filterChain.doFilter(request, response);
    }
}
