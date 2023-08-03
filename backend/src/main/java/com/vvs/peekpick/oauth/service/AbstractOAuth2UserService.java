package com.vvs.peekpick.oauth.service;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.member.service.MemberService;
import com.vvs.peekpick.oauth.common.converters.ProviderUserConverter;
import com.vvs.peekpick.oauth.common.converters.ProviderUserRequest;
import com.vvs.peekpick.oauth.model.ProviderUser;
import com.vvs.peekpick.member.dto.User;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Getter
@Service
@RequiredArgsConstructor
public abstract class AbstractOAuth2UserService {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final ProviderUserConverter<ProviderUserRequest, ProviderUser> providerUserConverter;
    private final ResponseService responseService;

//    // 가회원 등록 처리
//    public void register(ProviderUser providerUser, OAuth2UserRequest userRequest) {
//
//        Optional<Member> memberOptional = memberRepository.findByNameAndProvider(providerUser.getUsername(), providerUser.getProvider());
//        // 가입이력 있는 회원이라면
//        if (memberOptional.isPresent()) {
//            Member member = memberOptional.get();
//        } else {
//            ClientRegistration clientRegistration = userRequest.getClientRegistration();
//        }
//    }

    public ProviderUser providerUser(ProviderUserRequest providerUserRequest){
        return providerUserConverter.converter(providerUserRequest);
    }
}
