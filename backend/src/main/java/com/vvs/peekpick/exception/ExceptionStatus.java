package com.vvs.peekpick.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionStatus {

    /* 예시 */
    EXCEPTION_SAMPLE("-200", "예외가 발생하였습니다."),
    PICKER_SSE_DISCONNECTED("-3000", "대상이 미접속 상태입니다.");

    private final String code;
    private final String message;
}
