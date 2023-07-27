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

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final ResponseService responseService;

    // TODO
    // 소셜 로그인 버튼 클릭 시
    // 1. 이력 조회
    // 1-1 회원이라면 -> 정상 로그인 처리
    // 1-2 회원이 아니라면 -> 회원가입 로직 처리
    /**
     * 회원가입 처리
     * @param signUpDto
     * @return Avatar
     * 이 요청은 신규회원임이 보장된다.
     */
    @PostMapping("/signup")
    public DataResponse signup(@RequestBody SignUpDto signUpDto) {
        Avatar result = memberService.signup(signUpDto);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_CREATE, result);
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
    public DataResponse TasteList(@RequestParam("category_large") String categoryLarge) {
        List<Category> result = memberService.categoryList();
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
