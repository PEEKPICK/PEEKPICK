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

    private final String Peek_Redis = "Peek";
    private final String PeekLocation_Redis = "PeekLocation";

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
     * Point(경도, 위도) 반경 radius(m)에 있는 Peek들 찾기
     */
    @Override
    public List<PeekDto> findNearPeek(Point point, double radius) {
        Circle circle = new Circle(point, new Distance(radius, RedisGeoCommands.DistanceUnit.METERS));
        GeoResults<RedisGeoCommands.GeoLocation<Object>> nearPeekLocation = geoOps.geoRadius(PeekLocation_Redis, circle);

        List<PeekDto> nearPeek = new ArrayList<>();
        for (GeoResult<RedisGeoCommands.GeoLocation<Object>> peekLocation : nearPeekLocation) {
            nearPeek.add(findPeekById(Long.valueOf((String) peekLocation.getContent().getName())));
        }
        return nearPeek;
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
        geoOps.add(PeekLocation_Redis, peekLocationDto.getPoint(), peekLocationDto.getPeekId().toString());
        hashOps.put(Peek_Redis, peekDto.getPeekId().toString(), peekDto);
    }

    /**
     * peekId로 peekDto 찾기
     */
    @Override
    public PeekDto findPeekById(Long peekId) {
        return hashOps.get(Peek_Redis, peekId.toString());
    }

    /**
     * peek 삭제
     * - PeekLocation, PeekDto 각 삭제
     */
    @Override
    public void deletePeek(Long peekId) {
        geoOps.remove(PeekLocation_Redis, peekId.toString());
        hashOps.delete(Peek_Redis, peekId.toString());
    }


    /**
     * Peek의 반응 수정
     */
    @Override
    public void addReaction(Long peekId, boolean like, int count) {
        PeekDto peekDto = findPeekById(peekId);
        if (like) {
            peekDto.setLikeCount(peekDto.getLikeCount() + count);
        } else {
            peekDto.setDisLikeCount(peekDto.getDisLikeCount() + count);
        }
        hashOps.put(Peek_Redis, peekId.toString(), peekDto);
    }
}
