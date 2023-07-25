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


}
