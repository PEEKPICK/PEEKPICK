package com.vvs.peekpick.global.auth.util;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.oauth.model.PrincipalUser;
import com.vvs.peekpick.oauth.model.ProviderUser;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${auth.secretKey}")
    private String SECRET_KEY;

//    private static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L * 60 * 30; // 30분
    private static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24; // 테스트용 24시간
    private static final Long REFRESH_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24 * 365; // 1년

    //AccessToken 생성
    public String createAccessToken(Member member) {
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + ACCESS_TOKEN_VALIDATE_TIME);

        // 아바타 ID, Provider로 검증
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("avatarId", Long.toString(member.getAvatar().getAvatarId()));
        payloads.put("provider", member.getProvider());

        return Jwts.builder()
                .setClaims(payloads)
                .setSubject("auth")
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes())
                .compact();
    }

    //RefreshToken 생성
    public String createRefreshToken() {
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + REFRESH_TOKEN_VALIDATE_TIME);

        return Jwts.builder()
                .setSubject("refresh")
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes())
                .compact();
    }

    //AccessToken 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) { // 유효하지 않은 JWT
            //            throw new CustomException(TOKEN_INVALID);
            throw new MalformedJwtException("not valid jwt");
        } catch (ExpiredJwtException e) { // 만료된 JWT
            //            throw new CustomException(REFRESH_TOKEN_RENEWAL);
            throw new ExpiredJwtException(null, null, "expired");
        } catch (UnsupportedJwtException e) { // 지원하지 않는 JWT
            //            throw new CustomException(TOKEN_UNSUPPORTED);
            throw new UnsupportedJwtException("unsupported jwt");
        } catch (IllegalArgumentException e) { // 빈값
            //            throw new CustomException(TOKEN_NOT_FOUND);
            throw new IllegalArgumentException("empty jwt");
        }
    }

    // Token To AvatarID
    public Long getAvatarIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong((String)claims.get("avatarId"));
    }

    // AccessToken 만료 여부 체크
    public boolean isExpired(String token) {
        Claims claim = Jwts.parser().setSigningKey(SECRET_KEY.getBytes())
                                    .parseClaimsJws(token)
                                    .getBody();

        Date expiration = claim.getExpiration();
        return expiration.before(new Date());
    }

    public String getProviderFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token)
                .getBody();

        return (String)claims.get("provider");
    }

    // 23.08.02 마음에 안든다 createAccessToken 과 합쳐아 한다.
    public String RefreshToAccessToken(Long avatarId, String provider) {
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + ACCESS_TOKEN_VALIDATE_TIME);

        // 아바타 ID, Provider로 검증
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("avatarId", Long.toString(avatarId));
        payloads.put("provider", provider);

        return Jwts.builder()
                .setClaims(payloads)
                .setSubject("auth")
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes())
                .compact();
    }
}
