package com.vvs.peekpick.peek;

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
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PeekRedisTest {

    private final String Peek_Redis = "Peek";
    private final String PeekLocation_Redis = "PeekLocation";
    private final int MAX_PEEK = 10;

    @Autowired
    private PeekRedisService peekRedisService;

    @Autowired
    private RedisTemplate<String, Object> peekTemplate;

    @Autowired
    private RedisTemplate<String, Object> locationTemplate;

    private GeoOperations<String, Object> geoOps;
    private HashOperations<String, Object, PeekDto> hashOps;

    @BeforeEach
    public void beforeTest() {
        geoOps = locationTemplate.opsForGeo();
        hashOps = peekTemplate.opsForHash();
    }

    @AfterEach
    public void afterTest() {
        peekTemplate.delete(Peek_Redis);
        locationTemplate.delete(PeekLocation_Redis);
    }

    @Test
    public void testAddGetPeek() {
        PeekLocationDto peekLocationDto = new PeekLocationDto(1L, new Point(127.0, 37.0));
        PeekDto peekDto = new PeekDto(1L, 1L, "content", "imageUrl", 0, 0, LocalDateTime.now());
        peekRedisService.addPeek(peekLocationDto, peekDto);

        Point getPeekLocation = geoOps.geoPos(PeekLocation_Redis, peekLocationDto.getPeekId().toString()).get(0);
        assertEquals(peekLocationDto.getPoint().getX(), getPeekLocation.getX(), 0.0001);
        assertEquals(peekLocationDto.getPoint().getY(), getPeekLocation.getY(), 0.0001);

        PeekDto getPeek = (PeekDto) peekRedisService.getPeek(1L).getData();
        assertEquals(peekDto.getPeekId(), getPeek.getPeekId());
        assertEquals(peekDto.getMemberId(), getPeek.getMemberId());
        assertEquals(peekDto.getContent(), getPeek.getContent());
        assertEquals(peekDto.getImageUrl(), getPeek.getImageUrl());
        assertEquals(peekDto.getLikeCount(), getPeek.getLikeCount());
        assertEquals(peekDto.getDisLikeCount(), getPeek.getDisLikeCount());
        assertEquals(peekDto.getWriteTime().withNano(0), getPeek.getWriteTime().withNano(0));

        peekRedisService.deletePeek(peekDto.getPeekId());
        assertNull(peekRedisService.getPeek(peekLocationDto.getPeekId()).getData());
        assertNull(peekRedisService.getPeek(peekDto.getPeekId()).getData());
    }
 
}
