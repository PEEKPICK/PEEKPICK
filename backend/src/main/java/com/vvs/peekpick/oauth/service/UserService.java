package com.vvs.peekpick.oauth.service;

import com.vvs.peekpick.oauth.model.ProviderUser;
import com.vvs.peekpick.oauth.model.users.User;
import com.vvs.peekpick.oauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public void register(String registrationId, ProviderUser providerUser) {

        System.out.println(providerUser.toString());
        User user = User.builder().registrationId(registrationId)
                .id(providerUser.getId())
                .username(providerUser.getUsername())
                .password(providerUser.getPassword())
                .authorities(providerUser.getAuthorities())
                .provider(providerUser.getProvider())
                .email(providerUser.getEmail())
                .birthday(providerUser.getBirthDay())
                .build();

        userRepository.register(user);
    }
}
