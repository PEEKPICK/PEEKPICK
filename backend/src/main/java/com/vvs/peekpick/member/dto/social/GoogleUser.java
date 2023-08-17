package com.vvs.peekpick.member.dto.social;

import com.vvs.peekpick.global.oauth.model.Attributes;
import com.vvs.peekpick.global.oauth.model.OAuth2ProviderUser;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class GoogleUser extends OAuth2ProviderUser {

    public GoogleUser(Attributes mainAttributes, OAuth2User oAuth2User, ClientRegistration clientRegistration){
        super(mainAttributes.getMainAttributes(), oAuth2User, clientRegistration);
    }

    @Override
    public String getId() {
        return (String)getAttributes().get("sub");
    }

    @Override
    public String getUsername() {
        return (String)getAttributes().get("name");
    }

    @Override
    public String getBirthYear() {
        return null;
    }


    @Override
    public String getPhoneNumber() {
        return null;
    }

    @Override
    public String getGender() {
        return null;
    }

}
