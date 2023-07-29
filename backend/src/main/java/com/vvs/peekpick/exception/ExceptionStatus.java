package com.vvs.peekpick.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionStatus {

    /* 회원 */
    NOT_FOUND_USER("400", "존재하지 않는 사용자입니다.");

    private final String code;
    private final String message;
}
