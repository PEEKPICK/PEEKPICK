package com.vvs.peekpick.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseStatus {

    /* 예시 */
    RESPONSE_SAMPLE("200", "요청에 성공했습니다."),
    RESPONSE_CREATE("201", "SUCCESS");

    private final String code;
    private final String message;
}
