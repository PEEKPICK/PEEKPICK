package com.vvs.peekpick.global.oauth.common.converters;


import com.vvs.peekpick.global.oauth.common.enums.OAuth2Config;
import com.vvs.peekpick.global.oauth.common.util.OAuth2Utils;
import com.vvs.peekpick.global.oauth.model.ProviderUser;
import com.vvs.peekpick.member.dto.social.NaverUser;

public class OAuth2NaverProviderUserConverter implements ProviderUserConverter<ProviderUserRequest, ProviderUser> {

    @Override
    public ProviderUser converter(ProviderUserRequest providerUserRequest) {
        if(!providerUserRequest.getClientRegistration().getRegistrationId().equals(OAuth2Config.SocialType.NAVER.getSocialName())) {
            return null;
        }

        return new NaverUser(OAuth2Utils.getSubAttributes(providerUserRequest.getOAuth2User(), "response"),
                providerUserRequest.getOAuth2User(),
                providerUserRequest.getClientRegistration()
        );
    }
}
