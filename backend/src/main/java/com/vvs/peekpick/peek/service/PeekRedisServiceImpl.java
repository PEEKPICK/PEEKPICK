package com.vvs.peekpick.peek.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.RequestPeekDto;
import com.vvs.peekpick.peek.dto.SearchPeekDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekRedisServiceImpl implements PeekRedisService {

    private final String PEEK_REDIS = "Peek:"; //(key) Peek:peek의 id / (value) Peek
    private final String PEEK_LOCATION_REDIS = "Peek_Location:"; //(key) Peek_Location:peek의 id / (value) Peek의 값
    private final String PEEK_ID_KEY = "Peek_Id"; //PeekDto의 id 관리
    private final int MAX_PEEK = 10; // 화면 단에 전닿해주는 Peek 수

    private final int PEEK_ORIGIN_TIME = 30; // PEEK 기본 지속 시간
    private final int PEEK_REACTION_TIME = 5; // 좋아요, 싫어요 시 증가되는 시간

    private final ResponseService responseService;
    private final RedisTemplate<String, Object> peekTemplate;
    private final RedisTemplate<String, Object> locationTemplate;
    private GeoOperations<String, Object> geoOps;
    private ValueOperations<String, Object> valueOps;
    private final Random random = new Random();

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
                .finishTime(LocalDateTime.now().plusMinutes(PEEK_ORIGIN_TIME))
                .build();

        geoOps.add(PEEK_LOCATION_REDIS+ peekId, new Point(requestPeekDto.getLongitude(), requestPeekDto.getLatitude()), peekId.toString());
        locationTemplate.expire(PEEK_LOCATION_REDIS+peekId, Duration.ofMinutes(PEEK_ORIGIN_TIME));
        peekTemplate.opsForValue().set(PEEK_REDIS + peekId, peekDto, Duration.ofMinutes(PEEK_ORIGIN_TIME));
        return responseService.successCommonResponse(ResponseStatus.ADD_SUCCESS);
    }

    @Override
    public DataResponse getPeek(Long peekId) {
        Object obj = peekTemplate.opsForValue().get(PEEK_REDIS + peekId);
        System.out.println(obj);
        if (obj instanceof LinkedHashMap) {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            PeekDto peekDto = mapper.convertValue(obj, PeekDto.class);
            System.out.println(peekDto);
            return responseService.successDataResponse(ResponseStatus.LOADING_PEEK_SUCCESS, peekDto);
        } else {
            return responseService.failureDataResponse(ResponseStatus.PEEK_FAILURE, null);
        }
    }

    @Override
    public CommonResponse deletePeek(Long peekId) {
        geoOps.remove(PEEK_LOCATION_REDIS+peekId, peekId.toString());
        peekTemplate.delete(PEEK_REDIS + peekId);
        return responseService.successCommonResponse(ResponseStatus.DELETE_SUCCESS);
    }

    @Override
    public CommonResponse addReaction(Long peekId, boolean like, boolean add) {
        int count = add ? 1 : -1;
        Object obj = peekTemplate.opsForValue().get(PEEK_REDIS + peekId);

        if (obj instanceof LinkedHashMap) {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            PeekDto peekDto = mapper.convertValue(obj, PeekDto.class);
            PeekDto updatedPeekDto = peekDto.toBuilder()
                    .likeCount(like ? peekDto.getLikeCount() + count : peekDto.getLikeCount())
                    .disLikeCount(!like ? peekDto.getDisLikeCount() + count : peekDto.getDisLikeCount())
                    .finishTime(add ? peekDto.getFinishTime().plusMinutes(PEEK_REACTION_TIME) : peekDto.getFinishTime().minusMinutes(PEEK_REACTION_TIME))
                    .build();

            valueOps.set(PEEK_REDIS + peekId, updatedPeekDto);
            return responseService.successCommonResponse(ResponseStatus.ADD_REACTION_SUCCESS);
        } else {
            return responseService.failureCommonResponse(ResponseStatus.PEEK_FAILURE);
        }
    }


    @Override
    public DataResponse findNearPeek(SearchPeekDto searchPeekDto) {
        Circle circle = new Circle(searchPeekDto.getPoint(), new Distance(searchPeekDto.getDistance(), RedisGeoCommands.DistanceUnit.METERS));
        GeoResults<RedisGeoCommands.GeoLocation<Object>> nearPeekLocation = geoOps.geoRadius(PEEK_LOCATION_REDIS, circle);

        List<PeekDto> allPeeks = new ArrayList<>();
        for (GeoResult<RedisGeoCommands.GeoLocation<Object>> peekLocation : nearPeekLocation) {
            String peekId = peekLocation.getContent().getName().toString();
            allPeeks.add((PeekDto) valueOps.get(PEEK_REDIS + peekId));
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
}
