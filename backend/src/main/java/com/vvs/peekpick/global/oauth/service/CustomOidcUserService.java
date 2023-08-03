package com.vvs.peekpick.global.oauth.service;

import com.vvs.peekpick.global.oauth.common.converters.ProviderUserConverter;
import com.vvs.peekpick.global.oauth.common.converters.ProviderUserRequest;
import com.vvs.peekpick.global.oauth.model.PrincipalUser;
import com.vvs.peekpick.global.oauth.model.ProviderUser;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.member.service.MemberService;
import com.vvs.peekpick.response.ResponseService;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Service
public class CustomOidcUserService extends AbstractOAuth2UserService implements OAuth2UserService<OidcUserRequest, OidcUser> {

    public CustomOidcUserService(MemberRepository memberRepository, MemberService memberService, ProviderUserConverter<ProviderUserRequest, ProviderUser> providerUserConverter, ResponseService responseService) {
        super(memberRepository, memberService, providerUserConverter, responseService);
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {

        ClientRegistration clientRegistration = ClientRegistration.withClientRegistration(userRequest.getClientRegistration())
                .userNameAttributeName("sub")
                .build();

        OidcUserRequest oidcUserRequest = new OidcUserRequest(clientRegistration,
                                                              userRequest.getAccessToken(),
                                                              userRequest.getIdToken(), userRequest.getAdditionalParameters());

        OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService = new OidcUserService();
        OidcUser oidcUser = oidcUserService.loadUser(oidcUserRequest);

        ProviderUserRequest providerUserRequest = new ProviderUserRequest(clientRegistration, oidcUser);
        ProviderUser providerUser = super.providerUser(providerUserRequest);

        return new PrincipalUser(providerUser);
    }
}
