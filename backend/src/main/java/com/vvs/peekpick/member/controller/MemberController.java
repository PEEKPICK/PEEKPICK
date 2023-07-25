package com.vvs.peekpick.member.controller;


import com.vvs.peekpick.entity.Avatar;
import com.vvs.peekpick.entity.Taste;
import com.vvs.peekpick.member.dto.SignUpDto;
import com.vvs.peekpick.member.service.MemberService;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @GetMapping("/signup")
    public DataResponse signup(@RequestBody SignUpDto signUpDto) {
        Avatar result = memberService.signup(signUpDto);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_CREATE, result);
    }

}
