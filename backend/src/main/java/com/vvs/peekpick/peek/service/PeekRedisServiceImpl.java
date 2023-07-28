package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.peek.dto.SearchPeekDto;
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
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekRedisServiceImpl implements PeekRedisService {

    // Redis에 Peek 객체 저장할 Key
    private final String PEEK_REDIS = "Peek";

    // Redis에 Peek 객체별 위치를 저장할 Key
    private final String PEEK_LOCATION_REDIS = "PeekLocation";

    // Peek 가져올 갯수
    private final int MAX_PEEK = 10;
    private final Random random = new Random();
    //좋아요, 싫어요 시 적용되는 시간 (분)
    private final int PEEK_REACTION_TIME = 5;


    private final ResponseService responseService;
    private final RedisTemplate<String, Object> peekTemplate;
    private final RedisTemplate<String, Object> locationTemplate;
    private HashOperations<String, Object, PeekDto> hashOps;
    private GeoOperations<String, Object> geoOps;
    //private Long peekId;



    @PostConstruct
    public void init() {
        geoOps = locationTemplate.opsForGeo();
        hashOps = peekTemplate.opsForHash();
    }

    /**
     * Point(경도, 위도) 반경 distance (m)에 있는 Peek들 찾기
     */
    @Override
    public DataResponse findNearPeek(SearchPeekDto searchPeekDto) {
        Circle circle = new Circle(searchPeekDto.getPoint(), new Distance(searchPeekDto.getDistance(), RedisGeoCommands.DistanceUnit.METERS));
        GeoResults<RedisGeoCommands.GeoLocation<Object>> nearPeekLocation = geoOps.geoRadius(PEEK_LOCATION_REDIS, circle);

        List<PeekDto> allPeeks = new ArrayList<>();
        for (GeoResult<RedisGeoCommands.GeoLocation<Object>> peekLocation : nearPeekLocation) {
            String peekId = peekLocation.getContent().getName().toString();
            allPeeks.add(hashOps.get(PEEK_REDIS, peekId));
        }

        List<PeekDto> randomPeeks;
        if(allPeeks.size() <= MAX_PEEK){ //전체가 Max보다 적다면 모든 Peek 반환
            randomPeeks = allPeeks;
        } else {
            randomPeeks = new ArrayList<>();
            for (int i = 0; i < MAX_PEEK; i++) {
                int randomIndex = random.nextInt(allPeeks.size());
                randomPeeks.add(allPeeks.get(randomIndex));
                allPeeks.remove(randomIndex); // avoid duplicates
            }
        }
        return responseService.successDataResponse(ResponseStatus.Loading_Peek_LIST_SUCCESS, randomPeeks);
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
        geoOps.add(PEEK_LOCATION_REDIS, peekLocationDto.getPoint(), peekLocationDto.getPeekId().toString());
        hashOps.put(PEEK_REDIS, peekDto.getPeekId().toString(), peekDto);
        return responseService.successCommonResponse(ResponseStatus.ADD_SUCCESS);
    }

    /**
     * peekId로 peekDto 찾기
     */
    @Override
    public DataResponse getPeek(Long peekId) {
        PeekDto peekDto = hashOps.get(PEEK_REDIS, peekId.toString());
        return responseService.successDataResponse(ResponseStatus.Loading_Peek_SUCCESS, peekDto);
    }

    /**
     * peek 삭제
     * - PeekLocation, PeekDto 각 삭제
     */
    @Override
    public CommonResponse deletePeek(Long peekId) {
        geoOps.remove(PEEK_LOCATION_REDIS, peekId.toString());
        hashOps.delete(PEEK_REDIS, peekId.toString());
        return responseService.successCommonResponse(ResponseStatus.DELETE_SUCCESS);
    }


    /**
     * Peek의 반응 수정
     * like
     * - true : 좋아요
     * - false : 싫어요
     *
     * add
     * - true : 안 누른 상태 -> 누름
     * - false : 눌러져 있던 상태 -> 안 누른 상태
     *
     */
    @Override
    public CommonResponse addReaction(Long peekId, boolean like, boolean add) {
        int count;
        if(add) count = 1;
        else count = -1;

        PeekDto peekDto = hashOps.get(PEEK_REDIS, peekId.toString());
        if (like) { //좋아요를 눌렀다면
            peekDto.setLikeCount(peekDto.getLikeCount() + count); //갯수 반영
            peekDto.setFinishTime(peekDto.getFinishTime().plusMinutes(PEEK_REACTION_TIME));
        } else {
            peekDto.setDisLikeCount(peekDto.getDisLikeCount() + count);
        }
        hashOps.put(PEEK_REDIS, peekId.toString(), peekDto);
        return responseService.successCommonResponse(ResponseStatus.ADD_REACTION_SUCCESS);
    }
}
