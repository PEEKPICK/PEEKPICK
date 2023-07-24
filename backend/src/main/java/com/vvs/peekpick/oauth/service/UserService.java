package com.vvs.peekpick.oauth.service;

import com.vvs.peekpick.oauth.model.ProviderUser;
import com.vvs.peekpick.member.dto.User;
import com.vvs.peekpick.oauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public void register(String registrationId, ProviderUser providerUser) {

        User user = User.builder().registrationId(registrationId)
                .id(providerUser.getId())
                .username(providerUser.getUsername())
                .password(providerUser.getPassword())
                .authorities(providerUser.getAuthorities())
                .email(providerUser.getEmail())
                .birthYear(providerUser.getBirthYear())
                .birthday(providerUser.getBirthDay())
                .gender(providerUser.getGender())
                .phoneNumber(providerUser.getPhoneNumber())
                .build();

        userRepository.register(user);
    }
}
