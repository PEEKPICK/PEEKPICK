//package com.vvs.peekpick.oauth.service;
//
//import com.vvs.peekpick.oauth.common.converters.ProviderUserRequest;
//import com.vvs.peekpick.oauth.model.PrincipalUser;
//import com.vvs.peekpick.oauth.model.ProviderUser;
//import com.vvs.peekpick.member.dto.User;
//import com.vvs.peekpick.oauth.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class CustomUserDetailService extends AbstractOAuth2UserService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        User member = userRepository.findByUsername(username);
//        // TODO
//        // 현재는 테스트를 위해 사용자가 없으면 더미로 만드는데 이건 문제가 많다 + 이게 필요할까 ?
//        if (member == null) {
//            member = member.builder()
//                    .id("1")
//                    .username("user1")
//                    .password("{noop}1234")
//                    .authorities(AuthorityUtils.createAuthorityList("ROLE_USER"))
//                    .email("user@a.com")
//                    .build();
//        }
//
//        ProviderUserRequest providerUserRequest = new ProviderUserRequest(member);
//        ProviderUser providerUser = providerUser(providerUserRequest);
//
//        return new PrincipalUser(providerUser);
//    }
//}
