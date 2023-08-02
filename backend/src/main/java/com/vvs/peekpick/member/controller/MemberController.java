package com.vvs.peekpick.member.controller;


import com.vvs.peekpick.entity.*;
import com.vvs.peekpick.global.auth.dto.Token;
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
import java.util.List;
import java.util.Map;

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
        Token token = memberService.signup(signUpDto);

        Cookie cookie = new Cookie("refreshToken", token.getRefreshToken());
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(3600 * 24 * 365); // 1년
        response.addCookie(cookie);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_CREATE, token.getAccessToken());
    }

    /**
     * 회원 아바타 조회
     * @param authentication
     * @return
     */
    @GetMapping("/info")
    public DataResponse avatarInfo(Authentication authentication) {
        Long avatarId = Long.parseLong(authentication.getName());
        AvatarDto result = memberService.getAvatarInfo(avatarId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }

    /**
     * 회원 아바타 수정
     * @param authentication
     * @param param
     * @return
     */
    @PutMapping("/info")
    public CommonResponse updateAvatarInfo(Authentication authentication,
                                           @RequestBody Map<String, String> param) {
        Long avatarId = Long.parseLong(authentication.getName());
        memberService.updateAvatarInfo(avatarId, param);
        return responseService.successCommonResponse(ResponseStatus.RESPONSE_OK);
    }

    /**
     * 이모지 뽑기
     * @return
     */
    @GetMapping("/emoji")
    public DataResponse RandomEmoji() {
        Emoji result = memberService.RandomEmoji();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }

    /**
     * 이모지 수정하기
     * @param authentication
     * @param param
     * @return
     */
    @PutMapping("/info/emoji")
    public CommonResponse updateAvatarEmoji(Authentication authentication,
                                            @RequestBody Map<String, Long> param) {
        Long avatarId = Long.valueOf(authentication.getName());
        memberService.updateAvatarEmoji(avatarId, param.get("emojiId"));

        return responseService.successCommonResponse(ResponseStatus.RESPONSE_OK);
    }

    /**
     * 좋아요 태그 업데이트
     * @param authentication
     * @param param
     * @return
     */
    @PutMapping("/info/like")
    public CommonResponse updateAvatarLikes(Authentication authentication,
                                          @RequestBody Map<String, List<Long>> param) {
        Long avatarId = Long.valueOf(authentication.getName());
        memberService.updateAvatarLikes(avatarId, param.get("likes"));

        return responseService.successCommonResponse(ResponseStatus.RESPONSE_OK);
    }

    /**
     * 수식어 뽑기
     * @return
     */
    @GetMapping("/prefix")
    public DataResponse RandomPrefix() {
        Prefix result = memberService.RandomPrefix();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }

    /**
     * 월드 뽑기
     * @return
     */
    // 23.07.31 존재 이유를 모름
    @GetMapping("/world")
    public DataResponse RandomWorld() {
        List<World> result = memberService.RandomWorld();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }

    /**
     * 취향 태그 대분류 조회
     * @param categoryLarge
     * @return
     */
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

    /**
     * 가회원 정보 조회
     * @param memberId
     * @return
     */
    @GetMapping("/signup/info")
    public DataResponse MemberInfo(@RequestParam("id") Long memberId) {
        Member member = memberService.getMemberInfo(memberId);

        TempSignUpDto result = TempSignUpDto.builder()
                                            .name(member.getName())
                                            .email(member.getEmail())
                                            .phone(member.getPhone())
                                            .gender(member.getGender())
                                            .birthday(member.getBirthday())
                                            .build();

        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, result);
    }
}
