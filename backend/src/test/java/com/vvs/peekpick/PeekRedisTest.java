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

    @Test
    public void testFindNearPeek() {
        List<Long> ids = Arrays.asList(1L, 2L, 3L, 4L, 5L, 6L);
        List<Point> points = Arrays.asList(
                new Point(127.0001, 37.0001), new Point(127.0002, 37.0002), new Point(127.0003, 37.0003),
                new Point(127.002, 37.002), new Point(127.003, 37.003), new Point(127.004, 37.004)
        );
        for(int i = 0; i < ids.size(); i++) {
            PeekLocationDto locationDto = new PeekLocationDto(ids.get(i), points.get(i));
            PeekDto peekDto = new PeekDto(ids.get(i), ids.get(i), "content", "imageUrl", 0, 0, LocalDateTime.now());
            peekRedisService.addPeek(locationDto, peekDto);
        }

        List<PeekDto> nearPeeks = peekRedisService.findNearPeek(new Point(127, 37), 100);

        List<Long> nearPeekIds = Arrays.asList(1L, 2L, 3L);
        for(PeekDto peekDto : nearPeeks) {
            assertTrue(nearPeekIds.contains(peekDto.getPeekId()));
        }

        List<Long> notNearPeekIds = Arrays.asList(4L, 5L, 6L);
        for(PeekDto peekDto : nearPeeks) {
            assertFalse(notNearPeekIds.contains(peekDto.getPeekId()));
        }
    }


}
