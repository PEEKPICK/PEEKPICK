package com.vvs.peekpick.oauth.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.List;
import java.util.Map;

public interface ProviderUser {

    public String getId();
    public String getUsername();
    public String getPassword();
    public String getEmail();
    public String getBirthDay();
    public String getPicture();
    public String getProvider();
    public List<? extends GrantedAuthority> getAuthorities();
    public Map<String, Object> getAttributes();

    OAuth2User getOAuth2User();
}
