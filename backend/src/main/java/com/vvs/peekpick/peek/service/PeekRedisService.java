package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import org.springframework.data.geo.Point;

import java.util.List;

public interface PeekRedisService {
    public List<PeekDto> findNearPeek(Point point, double radius); //내 주변 Peek 찾기 & Peek 로딩 시
    public void addPeek(PeekLocationDto peekLocationDto, PeekDto peekDto); //Peek 작성
    public PeekDto findPeekById(Long peekId); //id로 Peek 찾기 
    public void deletePeek(Long peekId); //Peek 삭제
    public void addReaction(Long peekId, boolean like, int count); //Peek 반응 추가
}
