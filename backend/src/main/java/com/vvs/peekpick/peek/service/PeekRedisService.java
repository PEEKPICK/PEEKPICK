package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekRedisDto;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;

import java.util.List;

public interface PeekRedisService {

    void setPeek(PeekRedisDto peekRedisDto, Long peekId, int time);
    void deletePeek(Long peekId);
    PeekRedisDto getPeek(Long peekId);
    void setPeekLocation(double lon, double lat, Long peekId);
    Point getPeekLocation(Long peekId);
    void deletePeekLocation(Long peekId);
    List<String> getNearLocation(Point point, double distance);
    void setPeekValueOps(Long peekId, PeekRedisDto updatedPeekRedisDto);
    PeekRedisDto getPeekValueOps(Long peekId);
    void setViewedByMember(Long memberId, Long peekId, int time);
    boolean getViewdByMember(Long memberId, Long peekId);
    void setPeekReactionOn(Long memberId, boolean like, Long peekId, int time);
    void setPeekReactionOff(Long memberId, boolean like, Long peekId);
    boolean getReactionMember(Long memberId, boolean like, Long peekId);

}
