package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekNearSearchDto;
import com.vvs.peekpick.peek.dto.PeekReactionCntDto;
import com.vvs.peekpick.peek.dto.PeekRedisDto;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;

import java.util.List;

public interface PeekRedisService {

    void setPeek(PeekRedisDto peekRedisDto, Long peekId, int time);
    PeekReactionCntDto deletePeek(Long peekId);
    PeekRedisDto getPeek(Long peekId);
    Long getPeekTtl(Long peekId);
    void setPeekLocation(double lon, double lat, Long peekId);
    List<PeekNearSearchDto> getNearLocation(Point point, double distance);
    void setPeekValueOps(Long peekId, PeekRedisDto updatedPeekRedisDto, Long ttl);
    PeekRedisDto getPeekValueOps(Long peekId);
    void setViewedByMember(Long memberId, Long peekId);
    boolean getViewdByMember(Long memberId, Long peekId);
    void setPeekReactionOn(Long memberId, boolean like, Long peekId);
    void setPeekReactionOff(Long memberId, boolean like, Long peekId);
    boolean getReactionMember(Long memberId, boolean like, Long peekId);


}
