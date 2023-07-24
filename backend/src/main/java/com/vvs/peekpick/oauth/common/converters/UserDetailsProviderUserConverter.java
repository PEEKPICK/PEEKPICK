package com.vvs.peekpick.oauth.common.converters;


import com.vvs.peekpick.oauth.model.ProviderUser;
import com.vvs.peekpick.oauth.model.users.FormUser;
import com.vvs.peekpick.oauth.model.users.User;

public class UserDetailsProviderUserConverter implements ProviderUserConverter<ProviderUserRequest, ProviderUser> {

    @Override
    public ProviderUser converter(ProviderUserRequest providerUserRequest) {
        if(providerUserRequest.getUser() == null) {
            return null;
        }

        User user = providerUserRequest.getUser();
        return FormUser.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .email(user.getEmail())
                .authorities(user.getAuthorities())
                .provider("none")
                .build();
    }
}
