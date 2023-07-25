package com.vvs.peekpick;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.peek.service.PeekRedisService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PeekRedisTest {
    @Autowired
    private PeekRedisService peekRedisService;

    @Autowired
    private RedisTemplate<String, Object> peekTemplate;    

    @Autowired
    private RedisTemplate<String, Object> locationTemplate;    

    private GeoOperations<String, Object> geoOps;    

    @BeforeEach
    public void beforeTest() {
        geoOps = locationTemplate.opsForGeo();
    }

    @AfterEach
    public void afterTest() {
        peekTemplate.delete("Peek");
        locationTemplate.delete("PeekLocation");
    }

    @Test
    public void testAddGetDeletePeek() {
        PeekLocationDto peekLocationDto = new PeekLocationDto(1L, new Point(127.0, 37.0));
        PeekDto peekDto = new PeekDto(1L, 1L, "content", "imageUrl", 0, 0, LocalDateTime.now());
        peekRedisService.addPeek(peekLocationDto, peekDto);

        Point memberLocation = geoOps.geoPos("PeekLocation", peekLocationDto.getPeekId().toString()).get(0);
        assertEquals(peekLocationDto.getPoint().getX(), memberLocation.getX(), 0.0001);
        assertEquals(peekLocationDto.getPoint().getY(), memberLocation.getY(), 0.0001);

        PeekDto getPeekDto = peekRedisService.findPeekById(peekDto.getPeekId());
        assertEquals(peekDto.getPeekId(), getPeekDto.getPeekId());
        assertEquals(peekDto.getMemberId(), getPeekDto.getMemberId());
        assertEquals(peekDto.getContent(), getPeekDto.getContent());
        assertEquals(peekDto.getImageUrl(), getPeekDto.getImageUrl());
        assertEquals(peekDto.getLikeCount(), getPeekDto.getLikeCount());
        assertEquals(peekDto.getDisLikeCount(), getPeekDto.getDisLikeCount());
        assertEquals(peekDto.getWriteTime().withNano(0), getPeekDto.getWriteTime().withNano(0));

        peekRedisService.deletePeek(peekDto.getPeekId());
        assertNull(peekRedisService.findPeekById(peekDto.getPeekId()));
        List<Point> result = geoOps.geoPos("PeekLocation", peekLocationDto.getPeekId().toString());
        assertTrue(result == null || result.isEmpty());
    }



}
