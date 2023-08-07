package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.RequestPeekDto;
import com.vvs.peekpick.peek.dto.RequestSearchPeekDto;
import com.vvs.peekpick.report.dto.RequestReportDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;

import java.util.List;

public interface PeekService {
    DataResponse<List> findNearPeek(Long memberId, RequestSearchPeekDto requestSearchPeekDto); //내 주변 Peek 찾기 & Peek 로딩 시
    CommonResponse addPeek(Long memberId, RequestPeekDto requestPeekDto, String imageUrl); //Peek 작성
    DataResponse getPeek(Long memberId, Long avatarId, Long peekId); //id로 Peek 찾기
    CommonResponse deletePeek(Long memberId, Long peekId); //Peek 삭제
    CommonResponse addReaction(Long memberId, Long peekId, boolean like); //Peek 반응 추가

}
