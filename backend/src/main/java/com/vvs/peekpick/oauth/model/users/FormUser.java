package com.vvs.peekpick.oauth.model.users;

import com.vvs.peekpick.oauth.model.ProviderUser;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class FormUser implements ProviderUser {

    private String id;
    private String username;
    private String password;
    private String email;
    private String gender;
    private String phoneNumber;
    private String birthyear;
    private String birthday;
    private String provider;
    private List<? extends GrantedAuthority> authorities;

    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getBirthYear() {
        return null;
    }

    @Override
    public String getBirthDay() {
        return null;
    }

    @Override
    public String getProvider() {
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

    @Override
    public List<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public OAuth2User getOAuth2User() {
        return null;
    }
}
