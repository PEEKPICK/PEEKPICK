package com.vvs.peekpick.config;

import com.vvs.peekpick.global.auth.exception.CustomAccessDeniedHandler;
import com.vvs.peekpick.global.auth.exception.CustomAuthenticationEntryPoint;
import com.vvs.peekpick.global.filter.JwtAuthenticationFilter;
import com.vvs.peekpick.oauth.handler.CustomOAuth2LoginFailureHandler;
import com.vvs.peekpick.oauth.handler.CustomOAuth2LoginSuccessHandler;
import com.vvs.peekpick.oauth.service.CustomOAuth2UserService;
import com.vvs.peekpick.oauth.service.CustomOidcUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * SecurityConfig
 */
@EnableWebSecurity
@RequiredArgsConstructor
public class OAuth2ClientConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomOidcUserService customOidcUserService;

    private final CustomOAuth2LoginSuccessHandler customOAuth2LoginSuccessHandler;
    private final CustomOAuth2LoginFailureHandler customOAuth2LoginFailureHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    SecurityFilterChain oauth2SecurityFilterChain(HttpSecurity http) throws Exception {

        // 23.07.25 CSRF 비활성화
        // Form 로그인 처리 X
        http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 방식 사용 X
                .and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable();

        http
                .authorizeRequests()
                .antMatchers("/login","/member/test", "/member/signup", "/member/login", "/member/emoji",
                        "/member/prefix", "/member/world", "/member/taste", "/member/signup/info").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        //OAuth 관련 설정
        http
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService) // 네이버
                                .oidcUserService(customOidcUserService) // 구글, 카카오
                                .and()
                                .successHandler(customOAuth2LoginSuccessHandler) // 인증 성공
                                .failureHandler(customOAuth2LoginFailureHandler)) // 인증 실패
                                .permitAll());

        // 23.08.02 간단하게 구현, 완성도를 위해 디테일한 명세 필요
        http
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint) // 인증 실패
                .accessDeniedHandler(customAccessDeniedHandler); // 인가 실패

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
