package com.vvs.peekpick.peek.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.vvs.peekpick.peek.dto.*;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
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
    private final String PEEK_LOCATION_REDIS = "Peek_Location"; //(key) Peek_Location:peek의 id / (value) Peek의 값
    private final String PEEK_ID_KEY = "Peek_Id"; //PeekDto의 id 관리
    private final int MAX_PEEK = 10; // 화면 단에 전닿해주는 Peek 수

    private final int PEEK_ORIGIN_TIME = 30; // PEEK 기본 지속 시간
    private final int PEEK_REACTION_TIME = 5; // 좋아요, 싫어요 시 증가되는 시간

    private final ResponseService responseService;

    @Qualifier("peekRedisTemplate")
    private final RedisTemplate<String, Object> peekTemplate;
    @Qualifier("locationRedisTemplate")
    private final RedisTemplate<String, Object> locationTemplate;
    private GeoOperations<String, Object> geoOps;
    private ValueOperations<String, Object> valueOps;
    private SetOperations<String, Object> setOps;
    private final Random random = new Random();

    @PostConstruct
    public void init() {
        geoOps = locationTemplate.opsForGeo();
        valueOps = peekTemplate.opsForValue();
        setOps = peekTemplate.opsForSet();
    }

    @Override
    public Long generateId() {
        return valueOps.increment(PEEK_ID_KEY);
    }

    @Override
    public CommonResponse addPeek(RequestPeekDto requestPeekDto) {
        try {
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
                    .special(false)
                    .viewed(false)
                    .build();
            geoOps.add(PEEK_LOCATION_REDIS, new Point(requestPeekDto.getLongitude(), requestPeekDto.getLatitude()), peekId.toString());
            locationTemplate.expire(PEEK_LOCATION_REDIS, Duration.ofMinutes(PEEK_ORIGIN_TIME));
            peekTemplate.opsForValue().set(PEEK_REDIS + peekId, peekDto, Duration.ofMinutes(PEEK_ORIGIN_TIME));
            return responseService.successCommonResponse(ResponseStatus.ADD_SUCCESS);
        }
        catch (Exception e) {
            return responseService.failureCommonResponse(ResponseStatus.PEEK_FAILURE);
        }
    }


    @Override
    public DataResponse getPeek(String memberId, Long peekId) {
        try{
            PeekDto peekDto = (PeekDto) peekTemplate.opsForValue().get(PEEK_REDIS + peekId);
            setOps.add("member:" + memberId + ":viewed", String.valueOf(peekId));

            boolean isLiked= setOps.isMember("member:" + memberId + ":liked", String.valueOf(peekId));
            boolean isDisLiked = setOps.isMember("member:" + memberId + ":disLiked", String.valueOf(peekId));

            ResponsePeekDetailDto responsePeekDetailDto = ResponsePeekDetailDto.builder()
                    .peekId(peekDto.getPeekId())
                    .memberId(peekDto.getMemberId())
                    .content(peekDto.getContent())
                    .imageUrl(peekDto.getImageUrl())
                    .likeCount(peekDto.getLikeCount())
                    .disLikeCount(peekDto.getDisLikeCount())
                    .finishTime(peekDto.getFinishTime())
                    .liked(isLiked) //사용자가 눌렀는지
                    .disLiked(isDisLiked) //사용자가 눌렀는지
                    .build();
            return responseService.successDataResponse(ResponseStatus.LOADING_PEEK_SUCCESS, responsePeekDetailDto);
        }
        catch (Exception e) {
            e.printStackTrace();
            return responseService.failureDataResponse(ResponseStatus.PEEK_FAILURE, null);
        }
    }

    @Override
    public CommonResponse deletePeek(Long peekId) {
        try {
            geoOps.remove(PEEK_LOCATION_REDIS, peekId.toString());
            peekTemplate.delete(PEEK_REDIS + peekId);
            return responseService.successCommonResponse(ResponseStatus.DELETE_SUCCESS);
        }
        catch (Exception e) {
            return responseService.failureCommonResponse(ResponseStatus.PEEK_FAILURE);
        }
    }

    @Override
    public CommonResponse addReaction(Long peekId, String memberId, boolean like, boolean add) {
        int count = add ? 1 : -1;
        try {
            PeekDto peekDto = (PeekDto) peekTemplate.opsForValue().get(PEEK_REDIS + peekId);
            LocalDateTime updatedFinishTime = add ? peekDto.getFinishTime().plusMinutes(PEEK_REACTION_TIME) : peekDto.getFinishTime();
            boolean special = peekDto.isSpecial();

            if (Duration.between(peekDto.getWriteTime(), updatedFinishTime).toHours() >= 24) {
                updatedFinishTime = peekDto.getWriteTime().plusHours(24);
                special = true;
            }

            PeekDto updatedPeekDto = peekDto.toBuilder()
                    .likeCount(like ? peekDto.getLikeCount() + count : peekDto.getLikeCount())
                    .disLikeCount(!like ? peekDto.getDisLikeCount() + count : peekDto.getDisLikeCount())
                    .finishTime(updatedFinishTime)
                    .special(special)
                    .build();

            valueOps.set(PEEK_REDIS + peekId, updatedPeekDto);

            // 좋아요 눌렀을 때 레디스 추가 / 다시 좋아요 삭제 눌렀을 때 레디스에서도 삭제
            // 싫어요 눌렀을 떄 레디스 추가 / 다시 싫어요 눌렀을 때 레디스에서도 삭제
            if(like) {
                if(add) setOps.add("member:" + memberId + ":liked", String.valueOf(peekId));
                else setOps.remove("member:" + memberId + ":liked", String.valueOf(peekId));
            }
            else {
                if(add) setOps.add("member:" + memberId + ":disLiked", String.valueOf(peekId));
                else setOps.remove("member:" + memberId + ":disLiked", String.valueOf(peekId));
            }

            return responseService.successCommonResponse(ResponseStatus.ADD_REACTION_SUCCESS);
        }
        catch (Exception e) {
            return responseService.failureCommonResponse(ResponseStatus.PEEK_FAILURE);
        }
    }

    @Override
    public DataResponse findNearPeek(String memberId, SearchPeekDto searchPeekDto) {
        try {
            Circle circle = new Circle(searchPeekDto.getPoint(), new Distance(searchPeekDto.getDistance(), RedisGeoCommands.DistanceUnit.METERS));
            GeoResults<RedisGeoCommands.GeoLocation<Object>> nearPeekLocation = geoOps.geoRadius(PEEK_LOCATION_REDIS, circle);

            List<ResponsePeekListDto> allPeeks = new ArrayList<>();
            for (GeoResult<RedisGeoCommands.GeoLocation<Object>> peekLocation : nearPeekLocation) {
                String peekId = peekLocation.getContent().getName().toString();
                PeekDto peekDto = (PeekDto) valueOps.get(PEEK_REDIS + peekId);
                boolean isViewed = setOps.isMember("member:" + memberId + ":viewed", String.valueOf(peekId));

                ResponsePeekListDto responsePeekListDto = ResponsePeekListDto.builder()
                        .peekId(peekDto.getPeekId())
                        .special(peekDto.isSpecial())
                        .viewed(peekDto.isViewed())
                        .build();
                allPeeks.add(responsePeekListDto);
            }


            List<ResponsePeekListDto> randomPeeks;
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
        catch (Exception e) {
            return responseService.failureDataResponse(ResponseStatus.PEEK_FAILURE, null);
        }
    }
}
