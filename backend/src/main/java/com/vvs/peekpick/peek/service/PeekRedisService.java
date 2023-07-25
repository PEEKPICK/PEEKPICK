package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import org.springframework.data.geo.Point;

import java.util.List;

public interface PeekRedisService {
    public void addPeek(PeekLocationDto peekLocationDto, PeekDto peekDto);
    public PeekDto findPeekById(Long peekId);
    public void deletePeek(Long peekId);

}
