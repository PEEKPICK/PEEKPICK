package com.vvs.peekpick.global;

import com.vvs.peekpick.oauth.model.PrincipalUser;
import com.vvs.peekpick.oauth.model.ProviderUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${auth.secretKey}")
    private String SECRET_KEY;

    private static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L * 60 * 30; // 30분
    private static final Long REFRESH_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24 * 7; // 1주일

    //엑세스 토큰 생성
    public String createAccessToken(PrincipalUser principalUser) {
        ProviderUser providerUser = principalUser.getProviderUser();

        Date now = new Date();
        Date expireDate = new Date(now.getTime() + ACCESS_TOKEN_VALIDATE_TIME);

        Map<String, Object> payloads = new HashMap<>();
        payloads.put("id", Long.toString(principalUser.getId()));
        payloads.put("nickname", principalUser.getNickname());

        return Jwts.builder()
                .setClaims(payloads)
                .setSubject("auth")
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes())
                .compact();
    }

    //리프레시 토큰
    public String createRefreshToken() {
        // TODO: 2023-04-23 LocalDate로 수정 필요.
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + REFRESH_TOKEN_VALIDATE_TIME);

        return Jwts.builder()
                .setSubject("refresh")
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes())
                .compact();
    }
}
