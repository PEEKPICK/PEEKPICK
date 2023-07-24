package com.vvs.peekpick.oauth.controller;

import com.vvs.peekpick.oauth.model.PrincipalUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index(Model model, Authentication authentication,  @AuthenticationPrincipal PrincipalUser principalUser){
//        OAuth2AuthenticationToken authenticationToken = (OAuth2AuthenticationToken)authentication;

        if(authentication != null) {
            String userName = principalUser.getProviderUser().getUsername();

            model.addAttribute("user", userName);
            model.addAttribute("provider", principalUser.getProviderUser().getProvider());
        }

        return "index";
    }

}
