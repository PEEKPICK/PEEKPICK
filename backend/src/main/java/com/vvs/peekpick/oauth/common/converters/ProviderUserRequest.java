package com.vvs.peekpick.oauth.common.converters;

import com.vvs.peekpick.member.dto.User;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class ProviderUserRequest {
    private ClientRegistration clientRegistration;
    private OAuth2User oAuth2User;
    private User user;

    public ProviderUserRequest(ClientRegistration clientRegistration, OAuth2User oAuth2User, User user) {
        this.clientRegistration = clientRegistration;
        this.oAuth2User = oAuth2User;
        this.user = user;
    }

    public ProviderUserRequest(ClientRegistration clientRegistration, OAuth2User oAuth2User) {
        this(clientRegistration, oAuth2User, null);
    }

    public ProviderUserRequest(User user) {
        this(null, null, user);
    }

    public ClientRegistration getClientRegistration() {
        return clientRegistration;
    }

    public OAuth2User getOAuth2User() {
        return oAuth2User;
    }

    public User getUser() {
        return user;
    }
}