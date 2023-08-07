package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekRedisDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class PeekRedisServiceImpl implements PeekRedisService{

    private final String PEEK_REDIS = "Peek:"; //(key) Peek:peek의 id / (value) Peek
    private final String PEEK_LOCATION_REDIS = "Peek_Location:"; //(key) Peek_Location:peek의 id / (value) Peek의 값

    @Qualifier("peekRedisTemplate")
    private final RedisTemplate<String, Object> peekTemplate;
    @Qualifier("commonRedisTemplate")
    private final RedisTemplate<String, Object> locationTemplate;
    private GeoOperations<String, Object> geoOps;
    private ValueOperations<String, Object> valueOps;
    private SetOperations<String, Object> setOps;

    @PostConstruct
    public void init() {
        geoOps = locationTemplate.opsForGeo();
        valueOps = peekTemplate.opsForValue();
        setOps = peekTemplate.opsForSet();
    }

    @Override
    public void setPeek(PeekRedisDto peekRedisDto, Long peekId, int time) {
        //peekTemplate.opsForValue().set(PEEK_REDIS + peekId, peekRedisDto, Duration.ofMinutes(time));
        peekTemplate.opsForValue().set(PEEK_REDIS + peekId, peekRedisDto);
    }

    @Override
    public void deletePeek(Long peekId) {
        peekTemplate.delete(PEEK_REDIS + peekId);
    }

    @Override
    public PeekRedisDto getPeek(Long peekId) {
        return (PeekRedisDto) peekTemplate.opsForValue().get(PEEK_REDIS + peekId);
    }
    @Override
    public void setPeekLocation(double lon, double lat, Long peekId, int time) {
        geoOps.add(PEEK_LOCATION_REDIS+peekId, new Point(lon, lat), peekId.toString());
        //locationTemplate.expire(PEEK_LOCATION_REDIS, Duration.ofMinutes(time));
    }

    @Override
    public void deletePeekLocation(Long peekId) {
        geoOps.remove(PEEK_LOCATION_REDIS, peekId.toString());
    }

    @Override
    public GeoResults<RedisGeoCommands.GeoLocation<Object>> getNearLoaction(Circle circle) {
        return geoOps.geoRadius(PEEK_LOCATION_REDIS, circle);
    }

    @Override
    public void setPeekValueOps(Long peekId, PeekRedisDto updatedPeekRedisDto) {
        valueOps.set(PEEK_REDIS + peekId, updatedPeekRedisDto);
    }

    @Override
    public PeekRedisDto getPeekValueOps(Long peekId) {
        return (PeekRedisDto) valueOps.get(PEEK_REDIS + peekId);
    }

    @Override
    public void setViewedByMember(Long memberId, Long peekId, int time) {
        setOps.add("member:" + memberId + ":viewed", String.valueOf(peekId));
        peekTemplate.expire("member:" + memberId + ":viewed", Duration.ofHours(time));
    }
    @Override
    public boolean getViewdByMember(Long memberId, Long peekId) {
        return setOps.isMember("member:" + memberId + ":viewed", String.valueOf(peekId));
    }

    @Override
    public void setPeekReactionOn(Long memberId, boolean like, Long peekId, int time) {
        if(like) {
            setOps.add("member:" + memberId + ":liked", String.valueOf(peekId));
            peekTemplate.expire("member:" + memberId + ":liked", Duration.ofHours(time));
        }
        else {
            setOps.add("member:" + memberId + ":disLiked", String.valueOf(peekId));
            peekTemplate.expire("member:" + memberId + ":disLiked", Duration.ofHours(time));
        }
    }

    @Override
    public void setPeekReactionOff(Long memberId, boolean like, Long peekId) {
        if(like) setOps.remove("member:" + memberId + ":liked", String.valueOf(peekId));
        else setOps.remove("member:" + memberId + ":disLiked", String.valueOf(peekId));
    }


    @Override
    public boolean getReactionMember(Long memberId, boolean like, Long peekId) {
        if(like) return setOps.isMember("member:" + memberId + ":liked", String.valueOf(peekId));
        else return setOps.isMember("member:" + memberId + ":disLiked", String.valueOf(peekId));
    }

}
