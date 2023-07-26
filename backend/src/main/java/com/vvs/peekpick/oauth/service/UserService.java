package com.vvs.peekpick.oauth.service;

import com.vvs.peekpick.oauth.model.ProviderUser;
import com.vvs.peekpick.member.dto.User;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final ResponseService responseService;
    public DataResponse register(String registrationId, ProviderUser providerUser) {

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

        System.out.println(user);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SAMPLE, user);
//        userRepository.register(user);
    }
}
