package com.vvs.peekpick.global.oauth.common.enums;

// SocialType 정리, 확장성 고려 enum
public class OAuth2Config {

    public enum SocialType {
        GOOGLE("google"),
        NAVER("naver"),
        KAKAO("kakao"),
        ;

        private final String socialName;
        SocialType(String socialName) {
            this.socialName = socialName;
        }

        public String getSocialName() {
            return socialName;
        }
    }
}
