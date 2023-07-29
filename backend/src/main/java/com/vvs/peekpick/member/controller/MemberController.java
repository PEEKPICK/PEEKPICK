package com.vvs.peekpick.member.controller;


import com.vvs.peekpick.entity.*;
import com.vvs.peekpick.member.dto.SignUpDto;
import com.vvs.peekpick.member.dto.TempSignUpDto;
import com.vvs.peekpick.member.service.MemberService;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
    public DataResponse signup(@RequestBody SignUpDto signUpDto) {
        log.info("OK!");
        Avatar result = memberService.signup(signUpDto);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_CREATE, result);
    }

    @GetMapping("/info")
    public DataResponse memberInfo() {
        return null;
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
