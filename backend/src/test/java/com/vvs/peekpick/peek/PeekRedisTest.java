package com.vvs.peekpick.peek;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.peek.dto.SearchPeekDto;
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
import org.springframework.data.redis.core.ValueOperations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PeekRedisTest {

    private final String PEEK_REDIS = "Peek";
    private final String PEEK_LOCATION_REDIS = "PeekLocation";
    private final String PEEK_ID_KEY = "PEEK_ID";
    private final int MAX_PEEK = 10;

    @Autowired
    private PeekRedisService peekRedisService;

    @Autowired
    private RedisTemplate<String, Object> peekTemplate;

    @Autowired
    private RedisTemplate<String, Object> locationTemplate;

    private GeoOperations<String, Object> geoOps;
    private HashOperations<String, Object, PeekDto> hashOps;
    private ValueOperations<String, Object> valueOps;

    @BeforeEach
    public void beforeTest() {
        peekTemplate.delete(PEEK_REDIS);
        locationTemplate.delete(PEEK_LOCATION_REDIS);
        peekTemplate.delete(PEEK_ID_KEY);
        geoOps = locationTemplate.opsForGeo();
        hashOps = peekTemplate.opsForHash();
        valueOps = peekTemplate.opsForValue();
    }

    @AfterEach
    public void afterTest() {
        peekTemplate.delete(PEEK_REDIS);
        locationTemplate.delete(PEEK_LOCATION_REDIS);
        peekTemplate.delete(PEEK_ID_KEY);
    }

//    @Test
//    public void testAddPeek() {
//        PeekLocationDto peekLocationDto = new PeekLocationDto(1L, new Point(127.0, 37.0));
//        LocalDateTime writeTime = LocalDateTime.now();
//        PeekDto peekDto = new PeekDto(1L, 1L, "content", "imageUrl", 0, 0, writeTime, writeTime.plusMinutes(30));
//        peekRedisService.addPeek(peekLocationDto, peekDto);
//
//        // Get and verify data from Redis
//        PeekDto getPeek = (PeekDto) peekRedisService.getPeek(1L).getData();
//        assertEquals(peekDto.getPeekId(), getPeek.getPeekId());
//        assertEquals(peekDto.getMemberId(), getPeek.getMemberId());
//        assertEquals(peekDto.getContent(), getPeek.getContent());
//        assertEquals(peekDto.getImageUrl(), getPeek.getImageUrl());
//        assertEquals(peekDto.getLikeCount(), getPeek.getLikeCount());
//        assertEquals(peekDto.getDisLikeCount(), getPeek.getDisLikeCount());
//        assertEquals(peekDto.getWriteTime().withNano(0), getPeek.getWriteTime().withNano(0));
//        assertEquals(peekDto.getFinishTime().withNano(0), getPeek.getFinishTime().withNano(0));
//        System.out.println(getPeek);
//
//        // Check TTL
//        Long ttlPeek = peekTemplate.getExpire(peekDto.getPeekId().toString());
//        Long ttlLocation = locationTemplate.getExpire(peekLocationDto.getPeekId().toString());
//
//        System.out.println(ttlPeek);
//        System.out.println(ttlLocation);
////        assertNotNull(ttlPeek);
////        assertTrue(ttlPeek > 0);
////        assertNotNull(ttlLocation);
////        assertTrue(ttlLocation > 0);
//
//        // Delete test data
////        peekRedisService.deletePeek(peekDto.getPeekId());
////        assertNull(peekRedisService.getPeek(peekLocationDto.getPeekId()).getData());
////        assertNull(peekRedisService.getPeek(peekDto.getPeekId()).getData());
//    }


//    @Test
//    public void testAddGetPeek() {
//        PeekLocationDto peekLocationDto = new PeekLocationDto(1L, new Point(127.0, 37.0));
//        PeekDto peekDto = new PeekDto(1L, 1L, "content", "imageUrl", 0, 0, LocalDateTime.now(), LocalDateTime.now());
//        peekRedisService.addPeek(peekLocationDto, peekDto);
//
//        Point getPeekLocation = geoOps.geoPos(PeekLocation_Redis, peekLocationDto.getPeekId().toString()).get(0);
//        assertEquals(peekLocationDto.getPoint().getX(), getPeekLocation.getX(), 0.0001);
//        assertEquals(peekLocationDto.getPoint().getY(), getPeekLocation.getY(), 0.0001);
//
//        PeekDto getPeek = (PeekDto) peekRedisService.getPeek(1L).getData();
//        assertEquals(peekDto.getPeekId(), getPeek.getPeekId());
//        assertEquals(peekDto.getMemberId(), getPeek.getMemberId());
//        assertEquals(peekDto.getContent(), getPeek.getContent());
//        assertEquals(peekDto.getImageUrl(), getPeek.getImageUrl());
//        assertEquals(peekDto.getLikeCount(), getPeek.getLikeCount());
//        assertEquals(peekDto.getDisLikeCount(), getPeek.getDisLikeCount());
//        assertEquals(peekDto.getWriteTime().withNano(0), getPeek.getWriteTime().withNano(0));
//
//        peekRedisService.deletePeek(peekDto.getPeekId());
//        assertNull(peekRedisService.getPeek(peekLocationDto.getPeekId()).getData());
//        assertNull(peekRedisService.getPeek(peekDto.getPeekId()).getData());
//    }

//    @Test
//    public void testFindNearPeek() {
//        List<Long> ids = Arrays.asList(1L, 2L, 3L, 4L, 5L, 6L);
//        List<Point> points = Arrays.asList(
//                new Point(127.0001, 37.0001), new Point(127.0002, 37.0002), new Point(127.0003, 37.0003),
//                new Point(127.002, 37.002), new Point(127.003, 37.003), new Point(127.004, 37.004)
//        );
//        for(int i = 0; i < ids.size(); i++) {
//            PeekLocationDto locationDto = new PeekLocationDto(ids.get(i), points.get(i));
//            PeekDto peekDto = new PeekDto(ids.get(i), ids.get(i), "content", "imageUrl", 0, 0, LocalDateTime.now(), LocalDateTime.now());
//            peekRedisService.addPeek(locationDto, peekDto);
//        }
//
//        List<PeekDto> nearPeeks = peekRedisService.findNearPeek(new SearchPeekDto(new Point(127, 37), 100)).getData();
//        System.out.println(nearPeeks);
//        List<Long> nearPeekIds = Arrays.asList(1L, 2L, 3L);
//        for(PeekDto peekDto : nearPeeks) {
//            assertTrue(nearPeekIds.contains(peekDto.getPeekId()));
//        }
//
//        List<Long> notNearPeekIds = Arrays.asList(4L, 5L, 6L);
//        for(PeekDto peekDto : nearPeeks) {
//            assertFalse(notNearPeekIds.contains(peekDto.getPeekId()));
//        }
//    }
}
