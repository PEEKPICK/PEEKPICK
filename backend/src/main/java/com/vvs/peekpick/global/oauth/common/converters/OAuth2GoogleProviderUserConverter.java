package com.vvs.peekpick.global.oauth.common.converters;


import com.vvs.peekpick.global.oauth.common.enums.OAuth2Config;
import com.vvs.peekpick.global.oauth.common.util.OAuth2Utils;
import com.vvs.peekpick.global.oauth.model.ProviderUser;
import com.vvs.peekpick.member.dto.social.GoogleUser;

public class OAuth2GoogleProviderUserConverter implements ProviderUserConverter<ProviderUserRequest, ProviderUser> {

    @Override
    public ProviderUser converter(ProviderUserRequest providerUserRequest) {

        if(!providerUserRequest.getClientRegistration().getRegistrationId().equals(OAuth2Config.SocialType.GOOGLE.getSocialName())) {
            return null;
        }

        return new GoogleUser(OAuth2Utils.getMainAttributes(providerUserRequest.getOAuth2User()),
                providerUserRequest.getOAuth2User(),
                providerUserRequest.getClientRegistration()
        );
    }
}
