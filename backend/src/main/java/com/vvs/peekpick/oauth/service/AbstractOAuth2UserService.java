package com.vvs.peekpick.oauth.service;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.oauth.common.converters.ProviderUserConverter;
import com.vvs.peekpick.oauth.common.converters.ProviderUserRequest;
import com.vvs.peekpick.oauth.model.ProviderUser;
import com.vvs.peekpick.member.dto.User;
import com.vvs.peekpick.oauth.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Getter
@Service
public abstract class AbstractOAuth2UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

//    @Autowired
//    private MemberRepository memberRepository;

    @Autowired
    private  ProviderUserConverter<ProviderUserRequest, ProviderUser> providerUserConverter;

    public void register(ProviderUser providerUser, OAuth2UserRequest userRequest){
        User user = userRepository.findByUsername(providerUser.getUsername());

        // 가입이력 없는 회원이라면
        if(user == null) {
            ClientRegistration clientRegistration = userRequest.getClientRegistration();
            userService.register(clientRegistration.getRegistrationId(),providerUser);

        // 가입이력 있는 회원
        } else {
            System.out.println("userRequest = " + userRequest.toString());
        }
    }

    public ProviderUser providerUser(ProviderUserRequest providerUserRequest){
        return providerUserConverter.converter(providerUserRequest);
    }
}
