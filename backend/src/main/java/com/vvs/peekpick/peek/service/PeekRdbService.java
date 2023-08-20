package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.entity.Peek;
import com.vvs.peekpick.peek.repository.PeekRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekRdbService {
    private final PeekRepository peekRepository;

    public Peek findPeek(Long peekId) {
        return peekRepository.findById(peekId)
                .orElseThrow(() -> new IllegalArgumentException("Peek not found"));
    }

    @Transactional
    public Long savePeek(Peek peek) {
        Peek savedPeek = peekRepository.save(peek);
        return savedPeek.getPeekId();
    }

    @Transactional
    public void updatePeek(Long peekId, int like, int dislike) {
        Peek beforePeek = findPeek(peekId);
        beforePeek.updateCounts(like, dislike);
    }

    public List<Peek> findPeeksByMemberId(Long memberId) {
        return peekRepository.findPeeksByMember_MemberId(memberId);
    }

}
