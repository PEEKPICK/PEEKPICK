package com.vvs.peekpick.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionStatus {

    /* 예시 */
    EXCEPTION_SAMPLE("-200", "예외가 발생하였습니다."),
    PICKER_NOT_FOUNDED("-3000", "대상이 미접속 상태입니다."),
    
    /* 회원 */
    NOT_FOUND_USER("400", "존재하지 않는 사용자입니다"),
    NOT_FOUND_CATEGORY("400", "존재하지 않는 카테고리입니다"),
    NOT_FOUND_AVATAR("400", "존재하지 않는 아바타입니다"),

    NOT_MATCH_TOKEN("401", "유효하지 않은 토큰입니다.");
    private final String code;
    private final String message;
}
