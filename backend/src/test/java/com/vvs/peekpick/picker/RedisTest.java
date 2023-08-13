package com.vvs.peekpick.picker;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class RedisTest {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    private final String TEST_KEY = "temp";

    @AfterEach
    void afterAll() {
        redisTemplate.delete(TEST_KEY);
    }

    @Test
    void testHash() {
        // given
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();

        // when
        hashOperations.put(TEST_KEY, "hello", "world");

        // then
        Object value = hashOperations.get(TEST_KEY, "hello");
        assertThat(value).isEqualTo("world");
    }
}