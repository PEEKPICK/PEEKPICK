package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.RequestPeekDto;
import com.vvs.peekpick.peek.dto.RequestSearchPeekDto;
import com.vvs.peekpick.report.dto.RequestReportDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;

import java.util.List;

public interface PeekRedisService {
    DataResponse<List> findNearPeek(Long memberId, RequestSearchPeekDto requestSearchPeekDto); //내 주변 Peek 찾기 & Peek 로딩 시
    CommonResponse addPeek(RequestPeekDto requestPeekDto, String imageUrl); //Peek 작성
    DataResponse getPeek(Long avatarId, Long peekId); //id로 Peek 찾기
    CommonResponse deletePeek(Long peekId); //Peek 삭제
    CommonResponse addReaction(Long peekId, Long memberId, boolean like); //Peek 반응 추가
    CommonResponse  registerReport(Long memberId, Long peekId, RequestReportDto requestReportDto); //Peek 신고

}
