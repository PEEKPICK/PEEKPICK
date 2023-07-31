package com.vvs.peekpick.member.controller;


import com.vvs.peekpick.entity.*;
import com.vvs.peekpick.global.auth.Token;
import com.vvs.peekpick.member.dto.AvatarDto;
import com.vvs.peekpick.member.dto.SignUpDto;
import com.vvs.peekpick.member.dto.TempSignUpDto;
import com.vvs.peekpick.member.service.MemberService;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final ResponseService responseService;

    /**
     * 회원가입 처리
     * @param signUpDto
     * @return Avatar
     * 이 요청은 신규회원임이 보장된다.
     */
    @PostMapping("/signup")
    public DataResponse signup(@RequestBody SignUpDto signUpDto, HttpServletResponse response) {
        log.info("OK!");
        Token token = memberService.signup(signUpDto);

        Cookie cookie = new Cookie("refreshToken", token.getRefreshToken());
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(3600 * 24 * 365); // 1년
        response.addCookie(cookie);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_CREATE, token.getAccessToken());
    }

    // 회원 아바타 정보 조회
    @GetMapping("/info")
    public DataResponse avatarInfo(Authentication authentication) {
        Long avatarId = Long.parseLong(authentication.getName());
        AvatarDto result = memberService.getAvatarInfo(avatarId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }

    @GetMapping("/emoji")
    public DataResponse RandomEmoji() {
        Emoji result = memberService.RandomEmoji();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }

    @GetMapping("/prefix")
    public DataResponse RandomPrefix() {
        Prefix result = memberService.RandomPrefix();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }

    @GetMapping("/world")
    public DataResponse RandomWorld() {
        List<World> result = memberService.RandomWorld();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }

    @GetMapping("/taste")
    public DataResponse TasteList(@RequestParam(value = "category_large", required = false) String categoryLarge) {
        List<?> result;

        if (categoryLarge == null) {
            result = memberService.categoryList();
        } else {
            result = memberService.detailCategoryList(categoryLarge);
        }
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);

    }

    @GetMapping("/signup/info")
    public DataResponse MemberInfo(@RequestParam("id") Long memberId) {
        Member member = memberService.getMemberInfo(memberId);

        TempSignUpDto result = new TempSignUpDto();
        result.setName(member.getName());
        result.setEmail(member.getEmail());
        result.setPhone(member.getPhone());
        result.setGender(member.getGender());
        result.setBirthday(member.getBirthday());

        log.info("member = {}", member);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }
}
