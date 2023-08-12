package com.vvs.peekpick.member.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

// OAuth 구글, 카카오, 네이버 통합 DTO
@Data
@Builder
public class User {

    private String registrationId;
    private String id;
    private String username;
    private String password;
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
                ", email='" + email + '\'' +
                ", birthyear='" + birthYear + '\'' +
                ", birthday='" + birthday + '\'' +
                ", gender='" + gender + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", authorities=" + authorities +
                '}';
    }
}
