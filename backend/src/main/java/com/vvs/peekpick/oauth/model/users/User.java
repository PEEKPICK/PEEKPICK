package com.vvs.peekpick.oauth.model.users;

import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Data
@Builder
public class User {

    private String registrationId;
    private String id;
    private String username;
    private String password;
    private String provider;
    private String email;
    private String birthYear;
    private String birthday;
    private String gender;
    private String phoneNumber;
    private List<? extends GrantedAuthority> authorities;

    @Override
    public String toString() {
        return "User{" +
                "registrationId='" + registrationId + '\'' +
                ", id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", provider='" + provider + '\'' +
                ", email='" + email + '\'' +
                ", birthyear='" + birthYear + '\'' +
                ", birthday='" + birthday + '\'' +
                ", gender='" + gender + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", authorities=" + authorities +
                '}';
    }
}
