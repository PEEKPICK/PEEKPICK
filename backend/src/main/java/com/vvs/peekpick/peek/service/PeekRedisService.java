package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.peek.dto.RequestPeekDto;
import com.vvs.peekpick.peek.dto.SearchPeekDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;

import java.util.List;

public interface PeekRedisService {
    public Long generateId(); // ID를 생성하고 증가시키는 메소드
    public DataResponse<List> findNearPeek(String memberId, SearchPeekDto searchPeekDto); //내 주변 Peek 찾기 & Peek 로딩 시
    public CommonResponse addPeek(RequestPeekDto requestPeekDto); //Peek 작성
    public DataResponse getPeek(String memberId, Long peekId); //id로 Peek 찾기
    public CommonResponse deletePeek(Long peekId); //Peek 삭제
    public CommonResponse addReaction(Long peekId, Long memberId, boolean like, boolean add); //Peek 반응 추가
}
