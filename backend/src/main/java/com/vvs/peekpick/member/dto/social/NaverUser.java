package com.vvs.peekpick.member.dto.social;

import com.vvs.peekpick.oauth.model.Attributes;
import com.vvs.peekpick.oauth.model.OAuth2ProviderUser;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class NaverUser extends OAuth2ProviderUser {

    public NaverUser(Attributes attributes, OAuth2User oAuth2User, ClientRegistration clientRegistration){
        super(attributes.getSubAttributes(), oAuth2User, clientRegistration);
    }

    @Override
    public String getId() {
        return (String)getAttributes().get("email");
    }

    @Override
    public String getUsername() {
        return (String)getAttributes().get("name");
    }

    @Override
    public String getBirthYear() {
        return (String)getAttributes().get("birthyear");
    }

    @Override
    public String getPhoneNumber() {
        return (String)getAttributes().get("mobile");
    }

    @Override
    public String getGender() {
        return (String)getAttributes().get("gender");
    }
}