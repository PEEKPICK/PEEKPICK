package com.vvs.peekpick.member.controller;


import com.vvs.peekpick.member.service.MemberService;
import com.vvs.peekpick.response.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final ResponseService responseService;

    // TODO
    // 소셜 로그인 버튼 클릭 시
    // 1. 이력 조회
    // 1-1 회원이라면 -> 정상 로그인 처리
    // 1-2 회원이 아니라면 -> 회원가입 로직 처리

}
