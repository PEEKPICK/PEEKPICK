package com.vvs.peekpick.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseStatus {

    /* 예시 */
    RESPONSE_SAMPLE("200", "요청에 성공했습니다."),

    /* PICKER 관련 */
    CONNECTING_SUCCESS("3000", "접속되었습니다."),
    CONNECTION_LIST_SEARCH_SUCCESS("3001", "주변 PICK들이 조회되었습니다.");


    private final String code;
    private final String message;
}
