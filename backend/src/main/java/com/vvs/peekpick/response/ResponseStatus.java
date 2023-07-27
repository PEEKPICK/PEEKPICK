package com.vvs.peekpick.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseStatus {

    /* 예시 */
    RESPONSE_SAMPLE("200", "요청에 성공했습니다."),

    /* PEEK */
    Loading_Peek_LIST_SUCCESS("2000", "PEEK 리스트 로딩 완료"),
    Loading_Peek_SUCCESS("2001", "PEEK 로딩 완료"),
    ADD_SUCCESS("2002", "PEEK 추가 완료"),
    DELETE_SUCCESS("2003", "PEEK 삭제 완료"),
    ADD_REACTION_SUCCESS("2004", "PEEK 삭제 완료");

    private final String code;
    private final String message;
}
