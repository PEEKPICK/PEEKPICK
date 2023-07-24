package com.vvs.peekpick.oauth.model.social;

import com.vvs.peekpick.oauth.model.Attributes;
import com.vvs.peekpick.oauth.model.OAuth2ProviderUser;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public class KakaoUser extends OAuth2ProviderUser {

    private Map<String, Object> otherAttributes;

    public KakaoUser(Attributes attributes, OAuth2User oAuth2User, ClientRegistration clientRegistration){
        super(attributes.getSubAttributes(), oAuth2User, clientRegistration);
        this.otherAttributes = attributes.getOtherAttributes();
    }

    @Override
    public String getId() {
        return (String)getAttributes().get("id");
    }

    @Override
    public String getUsername() {
        return (String)otherAttributes.get("nickname");
    }

    @Override
    public String getPicture() {
        return (String)otherAttributes.get("profile_image_url");
    }
}