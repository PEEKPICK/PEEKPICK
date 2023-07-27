package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import com.vvs.peekpick.response.ResponseStatus;
import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekRedisServiceImpl implements PeekRedisService {

    private final String Peek_Redis = "Peek";
    private final String PeekLocation_Redis = "PeekLocation";
    private final int MAX_PEEK = 10;

    private final ResponseService responseService;
    private final RedisTemplate<String, Object> peekTemplate;
    private final RedisTemplate<String, Object> locationTemplate;
    private HashOperations<String, Object, PeekDto> hashOps;
    private GeoOperations<String, Object> geoOps;
    private Long peekId;

    @PostConstruct
    public void init() {
        geoOps = locationTemplate.opsForGeo();
        hashOps = peekTemplate.opsForHash();
    }

    /**
     * Point(경도, 위도) 반경 radius(m)에 있는 Peek들 찾기
     */
    @Override
    public DataResponse findNearPeek(Point point, double radius) {
        Circle circle = new Circle(point, new Distance(radius, RedisGeoCommands.DistanceUnit.METERS));
        GeoResults<RedisGeoCommands.GeoLocation<Object>> nearPeekLocation = geoOps.geoRadius(PeekLocation_Redis, circle);

        List<PeekDto> nearPeek = new ArrayList<>();
        for (GeoResult<RedisGeoCommands.GeoLocation<Object>> peekLocation : nearPeekLocation) {
            nearPeek.add(hashOps.get(Peek_Redis, peekId.toString()));
        }
        return responseService.successDataResponse(ResponseStatus.Loading_Peek_LIST_SUCCESS, nearPeek);
    }

    /**
     * Peek 등록
     * - Key : PeekLocation
     *   Value : Point(Peek의 경도, 위도)
     * - Key : Peek
     *   value : {Key : peekId 직렬화 값, Value : PeekDto} 
     */
    @Override
    public CommonResponse addPeek(PeekLocationDto peekLocationDto, PeekDto peekDto) {
        geoOps.add(PeekLocation_Redis, peekLocationDto.getPoint(), peekLocationDto.getPeekId().toString());
        hashOps.put(Peek_Redis, peekDto.getPeekId().toString(), peekDto);
        return responseService.successCommonResponse(ResponseStatus.ADD_SUCCESS);
    }

    /**
     * peekId로 peekDto 찾기
     */
    @Override
    public DataResponse findPeekById(Long peekId) {
        PeekDto peekDto = hashOps.get(Peek_Redis, peekId.toString());
        return responseService.successDataResponse(ResponseStatus.Loading_Peek_SUCCESS, peekDto);
    }

    /**
     * peek 삭제
     * - PeekLocation, PeekDto 각 삭제
     */
    @Override
    public CommonResponse deletePeek(Long peekId) {
        geoOps.remove(PeekLocation_Redis, peekId.toString());
        hashOps.delete(Peek_Redis, peekId.toString());
        return responseService.successCommonResponse(ResponseStatus.DELETE_SUCCESS);
    }


    /**
     * Peek의 반응 수정
     */
    @Override
    public CommonResponse addReaction(Long peekId, boolean like, int count) {
        PeekDto peekDto = hashOps.get(Peek_Redis, peekId.toString());
        if (like) {
            peekDto.setLikeCount(peekDto.getLikeCount() + count);
        } else {
            peekDto.setDisLikeCount(peekDto.getDisLikeCount() + count);
        }
        hashOps.put(Peek_Redis, peekId.toString(), peekDto);
        return responseService.successCommonResponse(ResponseStatus.ADD_REACTION_SUCCESS);
    }
}
