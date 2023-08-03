package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.entity.Peek;
import com.vvs.peekpick.peek.repository.PeekRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekServiceImpl implements PeekService{
    private final PeekRepository peekRepository;
    @Override
    @Transactional
    public Long savePeek(Peek peek) {
        Peek savedPeek = peekRepository.save(peek);
        return savedPeek.getPeekId();
    }
    @Override
    public Peek findPeek(Long peekId) {
        return peekRepository.findById(peekId)
                .orElseThrow(() -> new IllegalArgumentException("Peek not found"));
    }
}
