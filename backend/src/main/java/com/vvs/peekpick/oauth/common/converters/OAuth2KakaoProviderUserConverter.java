package com.vvs.peekpick.oauth.common.converters;

import com.vvs.peekpick.oauth.common.enums.OAuth2Config;
import com.vvs.peekpick.oauth.common.util.OAuth2Utils;
import com.vvs.peekpick.oauth.model.ProviderUser;
import com.vvs.peekpick.oauth.model.social.KakaoUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

public class OAuth2KakaoProviderUserConverter implements ProviderUserConverter<ProviderUserRequest, ProviderUser> {

    @Override
    public ProviderUser converter(ProviderUserRequest providerUserRequest) {
        if(!providerUserRequest.getClientRegistration().getRegistrationId().equals(OAuth2Config.SocialType.KAKAO.getSocialName())) {
            return null;
        }

        if (providerUserRequest.getOAuth2User() instanceof OidcUser) {
            return null;
        }

        return new KakaoUser(OAuth2Utils.getOtherAttributes(providerUserRequest.getOAuth2User(), "kakao_account", "profile"),
                providerUserRequest.getOAuth2User(),
                providerUserRequest.getClientRegistration()
        );
    }
}
