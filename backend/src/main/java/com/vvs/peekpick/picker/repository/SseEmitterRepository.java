package com.vvs.peekpick.picker.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@RequiredArgsConstructor
public class SseEmitterRepository {

    private final Map<Long, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

    public void put(Long memberId, SseEmitter emitter) {
        sseEmitterMap.put(memberId, emitter);
    }

    public Optional<SseEmitter> get(Long memberId){
        return Optional.ofNullable(sseEmitterMap.get(memberId));
    }

    public void remove(Long memberId){
        sseEmitterMap.remove(memberId);
    }
}
