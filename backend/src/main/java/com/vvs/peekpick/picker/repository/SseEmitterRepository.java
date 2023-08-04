package com.vvs.peekpick.picker.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SseEmitterRepository {
    private final Map<Long, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

    public void put(Long key, SseEmitter sseEmitter){
        sseEmitterMap.put(key, sseEmitter);
    }

    public Optional<SseEmitter> get(Long key) {
        return Optional.ofNullable(sseEmitterMap.get(key));
    }

    public void remove(Long key) {
        sseEmitterMap.remove(key);
    }
}
