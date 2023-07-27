package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import org.springframework.data.geo.Point;

import java.util.List;

public interface PeekRedisService {
    public DataResponse<List> findNearPeek(Point point, double radius); //내 주변 Peek 찾기 & Peek 로딩 시
    public CommonResponse addPeek(PeekLocationDto peekLocationDto, PeekDto peekDto); //Peek 작성
    public DataResponse findPeekById(Long peekId); //id로 Peek 찾기
    public CommonResponse deletePeek(Long peekId); //Peek 삭제
    public CommonResponse addReaction(Long peekId, boolean like, int count); //Peek 반응 추가
}
