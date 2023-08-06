package com.vvs.peekpick.picker.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.annotation.PostConstruct;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@RequiredArgsConstructor
public class SseEmitterRepository {
    private Map<Long, SseEmitter> sseEmitterMap;

    @PostConstruct
    public void init(){
        sseEmitterMap = new ConcurrentHashMap<>();
    }

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
