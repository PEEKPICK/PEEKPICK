package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekRedisDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.lang.reflect.Type;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekRedisServiceImpl implements PeekRedisService{

    public static final String PEEK_REDIS = "Peek:"; //(key) Peek:peek의 id / (value) Peek
    public static final String PEEK_LOCATION_REDIS = "Peek_Location"; //(key) Peek_Location:peek의 id / (value) Peek의 값

    @Qualifier("peekRedisTemplate")
    private final RedisTemplate<String, Object> peekTemplate;

    private final RedisTemplate<String, String> locationTemplate;
    private GeoOperations<String, String> geoOps;
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
        peekTemplate.opsForValue().set(PEEK_REDIS + peekId, peekRedisDto, Duration.ofMinutes(time));
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
    public void setPeekLocation(double lon, double lat, Long peekId) {
        log.info("=== PEEK REDIS SERVICE IMPL {}, {}", lon, lat);
        log.info("=== PEEK REDIS SERVICE IMPL {}", peekId.toString());
        try {
            geoOps.add(PEEK_LOCATION_REDIS, new Point(lon, lat), peekId.toString());
        } catch (Exception e) {
            log.error("Error while adding to geoOps: ", e);
        }
    }

    @Override
    public Point getPeekLocation(Long peekId) {
        return (Point) geoOps.position(PEEK_LOCATION_REDIS, peekId.toString());
    }

    @Override
    public void deletePeekLocation(Long peekId) {
        geoOps.remove(PEEK_LOCATION_REDIS, peekId.toString());
    }

    @Override
    public List<String> getNearLocation(Point point, double distance) { //GeoResults<RedisGeoCommands.GeoLocation<String>>
        System.out.println(point);
        System.out.println(distance);
        List<String> nearPeekIds = new ArrayList<>();
        GeoResults<RedisGeoCommands.GeoLocation<String>> allLocations = geoOps.radius(PEEK_LOCATION_REDIS, new Circle(new Point(point.getX(), point.getY()), new Distance(distance, RedisGeoCommands.DistanceUnit.KILOMETERS)));

        allLocations.forEach(location -> {
            nearPeekIds.add(location.getContent().getName());
        });
        System.out.println(nearPeekIds);
        return nearPeekIds;
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
