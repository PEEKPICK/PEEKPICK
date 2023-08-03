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
    DISCONNECT_SUCCESS("3001", "접속 종료되었습니다."),
    CONNECTION_LIST_SEARCH_SUCCESS("3002", "주변 PICK들이 조회되었습니다."),

    RESPONSE_OK("200", "SUCCESS"),
    RESPONSE_CREATE("201", "SUCCESS"),
    
    /* PEEK */
    LOADING_PEEK_LIST_SUCCESS("2000", "PEEK 리스트 로딩 완료"),
    LOADING_PEEK_SUCCESS("2001", "PEEK 로딩 완료"),
    ADD_SUCCESS("2002", "PEEK 추가 완료"),
    DELETE_SUCCESS("2003", "PEEK 삭제 완료"),
    ADD_REACTION_SUCCESS("2004", "PEEK 반응 추가 완료"),
    PEEK_FAILURE("9000", "Fail"),

    /* Report */
    GET_CATEGORY_SUCCESS("9000", "신고 카테고리 조회 완료"),
    REGISTER_REPORT_SUCCESS("9001", "신고 등록 완료");

    private final String code;
    private final String message;
}
