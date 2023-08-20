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
    CHAT_REQUEST_SUCCESS("3003", "채팅을 요청하였습니다."),
    CHAT_REQUEST_REJECTED("3004", "채팅 요청이 거절되었습니다"),
    CHAT_REQUEST_ACCEPTED("3005", "채팅 요청이 수락되었습니다."),
    CHAT_REQUEST_TIMEOUT("3006", "요청이 만료되었습니다"),
    SSE_DISCONNECTED("3007", "Emitter가 제거 되었습니다."),

    RESPONSE_OK("200", "SUCCESS"),
    RESPONSE_CREATE("201", "SUCCESS"),
    
    /* PEEK */
    LOADING_PEEK_LIST_SUCCESS("2000", "PEEK 리스트 로딩 완료"),
    LOADING_PEEK_LIST_SUCCESS_NO_PEEK("2001", "PEEK 리스트 로딩 완료 (Peek이 없습니다.)"),
    LOADING_PEEK_SUCCESS("2002", "PEEK 로딩 완료"),
    ADD_SUCCESS("2003", "PEEK 추가 완료"),
    DELETE_SUCCESS("2004", "PEEK 삭제 완료"),
    ADD_REACTION_SUCCESS("2005", "PEEK 반응 추가 완료"),
    PEEK_FAILURE("4000", "Fail"),
    PEEK_EXPIRED("4001", "Peek 지속 시간 만료"),
    DELETE_FAILURE("4003", "PEEK 작성자가 아닙니다."),

    /* Report */
    GET_CATEGORY_SUCCESS("8000", "신고 카테고리 조회 완료"),
    REGISTER_REPORT_SUCCESS("8001", "신고 등록 완료"),
    REPORT_FAILURE("9001",  "본인은 신고 불가"),

    /* 채팅 */
    CHATROOM_EXIT_SUCCESS("4000", "채팅방을 나갔습니다.");

    private final String code;
    private final String message;
}
