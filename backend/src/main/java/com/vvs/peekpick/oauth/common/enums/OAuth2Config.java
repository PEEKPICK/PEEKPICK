package com.vvs.peekpick.oauth.common.enums;

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
