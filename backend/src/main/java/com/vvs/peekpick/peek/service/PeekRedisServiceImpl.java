package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekRedisServiceImpl implements PeekRedisService {
    private final RedisTemplate<String, Object> peekTemplate;
    private final RedisTemplate<String, Object> locationTemplate;
    private HashOperations<String, Object, PeekDto> hashOps;
    private GeoOperations<String, Object> geoOps;    

    @PostConstruct
    public void init() {
        geoOps = locationTemplate.opsForGeo();
        hashOps = peekTemplate.opsForHash();
    }

    /**
     * Peek 등록
     * - Key : PeekLocation
     *   Value : Point(Peek의 경도, 위도)
     * - Key : Peek
     *   value : {Key : peekId 직렬화 값, Value : PeekDto} 
     */
    @Override
    public void addPeek(PeekLocationDto peekLocationDto, PeekDto peekDto) {
        geoOps.add("PeekLocation", peekLocationDto.getPoint(), peekLocationDto.getPeekId().toString());
        hashOps.put("Peek", peekDto.getPeekId().toString(), peekDto);
    }

    /**
     * peekId로 peekDto 찾기
     */
    @Override
    public PeekDto findPeekById(Long peekId) {
        return hashOps.get("Peek", peekId.toString());
    }

    /**
     * peek 삭제
     * - PeekLocation, PeekDto 각 삭제
     */
    @Override
    public void deletePeek(Long peekId) {
        geoOps.remove("PeekLocation", peekId.toString());
        hashOps.delete("Peek", peekId.toString());
    }
}
