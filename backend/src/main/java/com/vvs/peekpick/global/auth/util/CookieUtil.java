package com.vvs.peekpick.global.auth.util;

import org.springframework.http.ResponseCookie;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

// 23.08.03 RefreshToken Cookie 만 존재
public class CookieUtil {

    // 특정 쿠키 get
    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    return Optional.ofNullable(cookie);
                }
            }
        }

        return Optional.empty();
    }

    // 쿠키 생성
    // 23.08.03 RefreshToken Cookie 말고 만들게 없다
    public static void createCookie(HttpServletResponse response, String value) {
        Cookie cookie = new Cookie("refreshToken", value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60 * 60 * 24 * 365); // 1년

//        cookie.setSecure(true); // https 일 때 사용

        response.addCookie(cookie);

//        ResponseCookie cookie = ResponseCookie.from("refreshToken", value)
//                .path("/")
////                .domain("localhost")
//                .httpOnly(true)
//                .maxAge(60 * 60 * 24 * 365)
//                .sameSite("None")
//                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }

    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }
}
