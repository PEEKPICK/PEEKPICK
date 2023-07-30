package com.vvs.peekpick.peek.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.peek.dto.RequestPeekDto;
import com.vvs.peekpick.peek.dto.SearchPeekDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekRedisServiceImpl implements PeekRedisService {

    private final String PEEK_REDIS = "Peek";
    private final String PEEK_LOCATION_REDIS = "Peek_Location";
    private final String PEEK_ID_KEY = "Peek_Id";
    private ValueOperations<String, Object> valueOps;

    private final int MAX_PEEK = 10;
    private final Random random = new Random();

    private final int PEEK_REACTION_TIME = 5;

    private final ResponseService responseService;
    private final RedisTemplate<String, Object> peekTemplate;
    private final RedisTemplate<String, Object> locationTemplate;
    private GeoOperations<String, Object> geoOps;

    @PostConstruct
    public void init() {
        geoOps = locationTemplate.opsForGeo();
        valueOps = peekTemplate.opsForValue();
    }

    @Override
    public Long generateId() {
        return valueOps.increment(PEEK_ID_KEY);
    }

    @Override
    public DataResponse findNearPeek(SearchPeekDto searchPeekDto) {
        Circle circle = new Circle(searchPeekDto.getPoint(), new Distance(searchPeekDto.getDistance(), RedisGeoCommands.DistanceUnit.METERS));
        GeoResults<RedisGeoCommands.GeoLocation<Object>> nearPeekLocation = geoOps.geoRadius(PEEK_LOCATION_REDIS, circle);

        List<PeekDto> allPeeks = new ArrayList<>();
        for (GeoResult<RedisGeoCommands.GeoLocation<Object>> peekLocation : nearPeekLocation) {
            String peekId = peekLocation.getContent().getName().toString();
            allPeeks.add((PeekDto) valueOps.get(PEEK_REDIS + ":" + peekId));
        }

        List<PeekDto> randomPeeks;
        if(allPeeks.size() <= MAX_PEEK){
            randomPeeks = allPeeks;
        } else {
            randomPeeks = new ArrayList<>();
            for (int i = 0; i < MAX_PEEK; i++) {
                int randomIndex = random.nextInt(allPeeks.size());
                randomPeeks.add(allPeeks.get(randomIndex));
                allPeeks.remove(randomIndex);
            }
        }

        return responseService.successDataResponse(ResponseStatus.LOADING_PEEK_LIST_SUCCESS, randomPeeks);
    }

    @Override
    public CommonResponse addPeek(RequestPeekDto requestPeekDto) {
        Long peekId = generateId();

        PeekDto peekDto = PeekDto.builder()
                .peekId(peekId)
                .memberId(requestPeekDto.getMemberId())
                .content(requestPeekDto.getContent())
                .imageUrl(requestPeekDto.getImageUrl())
                .likeCount(0)
                .disLikeCount(0)
                .writeTime(LocalDateTime.now())
                .finishTime(LocalDateTime.now().plusMinutes(1))
                .build();

        PeekLocationDto peekLocationDto = PeekLocationDto.builder()
                .peekId(peekId)
                .point(new Point(requestPeekDto.getLongitude(), requestPeekDto.getLatitude()))
                .build();

        geoOps.add(PEEK_LOCATION_REDIS, peekLocationDto.getPoint(), peekLocationDto.getPeekId().toString());
        valueOps.set(PEEK_REDIS + ":" + peekId, peekDto);

        Duration ttl = Duration.ofMinutes(1);
        peekTemplate.expire(PEEK_REDIS + ":" + peekId, ttl);
        locationTemplate.expire(peekId.toString(), ttl);

        return responseService.successCommonResponse(ResponseStatus.ADD_SUCCESS);
    }

//    @Override
//    public DataResponse getPeek(Long peekId) {
//        PeekDto peekDto = (PeekDto) valueOps.get(PEEK_REDIS + ":" + peekId);
//        return responseService.successDataResponse(ResponseStatus.LOADING_PEEK_SUCCESS, peekDto);
//    }
    @Override
    public DataResponse getPeek(Long peekId) {
        byte[] rawData = (byte[]) valueOps.get(PEEK_REDIS + ":" + peekId);
        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer();
        PeekDto peekDto = (PeekDto) serializer.deserialize(rawData);
        return responseService.successDataResponse(ResponseStatus.LOADING_PEEK_SUCCESS, peekDto);
    }




    @Override
    public CommonResponse deletePeek(Long peekId) {
        geoOps.remove(PEEK_LOCATION_REDIS, peekId.toString());
        peekTemplate.delete(PEEK_REDIS + ":" + peekId);
        return responseService.successCommonResponse(ResponseStatus.DELETE_SUCCESS);
    }

    @Override
    public CommonResponse addReaction(Long peekId, boolean like, boolean add) {
        int count = add ? 1 : -1;
        String peekKey = PEEK_REDIS + ":" + peekId;

        PeekDto peekDto = (PeekDto) valueOps.get(peekKey);

        PeekDto updatedPeekDto = peekDto.toBuilder()
                .likeCount(like ? peekDto.getLikeCount() + count : peekDto.getLikeCount())
                .disLikeCount(!like ? peekDto.getDisLikeCount() + count : peekDto.getDisLikeCount())
                .finishTime(add ? peekDto.getFinishTime().plusMinutes(PEEK_REACTION_TIME) : peekDto.getFinishTime())
                .build();

        valueOps.set(peekKey, updatedPeekDto);

        return responseService.successCommonResponse(ResponseStatus.ADD_REACTION_SUCCESS);
    }
}
