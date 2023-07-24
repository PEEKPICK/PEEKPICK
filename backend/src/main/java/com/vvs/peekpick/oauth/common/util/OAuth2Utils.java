package com.vvs.peekpick.oauth.common.util;

import com.vvs.peekpick.oauth.common.enums.OAuth2Config;
import com.vvs.peekpick.oauth.model.Attributes;
import com.vvs.peekpick.oauth.model.PrincipalUser;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public class OAuth2Utils {

    public static Attributes getMainAttributes(OAuth2User oAuth2User) {

        return Attributes.builder()
                .mainAttributes(oAuth2User.getAttributes())
                .build();
    }

    public static Attributes getSubAttributes(OAuth2User oAuth2User, String subAttributesKey) {

        Map<String, Object> subAttributes = (Map<String, Object>) oAuth2User.getAttributes().get(subAttributesKey);
        return Attributes.builder()
                .subAttributes(subAttributes)
                .build();
    }

    public static Attributes getOtherAttributes(OAuth2User oAuth2User, String subAttributesKey, String otherAttributesKey) {

        Map<String, Object> subAttributes = (Map<String, Object>) oAuth2User.getAttributes().get(subAttributesKey);
        Map<String, Object> otherAttributes = (Map<String, Object>) subAttributes.get(otherAttributesKey);

        return Attributes.builder()
                .subAttributes(subAttributes)
                .otherAttributes(otherAttributes)
                .build();
    }

    public static String oAuth2UserName(OAuth2AuthenticationToken authentication, PrincipalUser principalUser) {

        String username;
        String registrationId = authentication.getAuthorizedClientRegistrationId();
        OAuth2User oAuth2User = principalUser.getProviderUser().getOAuth2User();

        // 구글
        Attributes attributes = OAuth2Utils.getMainAttributes(oAuth2User);
        username = (String) attributes.getMainAttributes().get("name");

        // 네이버
        if (registrationId.equals(OAuth2Config.SocialType.NAVER.getSocialName())) {
            attributes = OAuth2Utils.getSubAttributes(oAuth2User, "response");
            username = (String) attributes.getSubAttributes().get("name");
        // 카카오
        } else if (registrationId.equals(OAuth2Config.SocialType.KAKAO.getSocialName())) {

            // OPEN ID
            if (oAuth2User instanceof OidcUser) {
                attributes = OAuth2Utils.getMainAttributes(oAuth2User);
                username = (String) attributes.getMainAttributes().get("nickname");
            } else {
                attributes = OAuth2Utils.getOtherAttributes(principalUser, "profile", null);
                username = (String) attributes.getSubAttributes().get("nickname");
            }
        }

        return username;
    }
}