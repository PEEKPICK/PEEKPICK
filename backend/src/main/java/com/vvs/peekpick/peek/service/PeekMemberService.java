package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.peek.repository.PeekMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekMemberService {
    private final PeekMemberRepository peekMemberRepository;

    public Member findMember(Long memberId) {
        return peekMemberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
    }

    public Member findMemberByAvatarId(Long avatarId) {
        return peekMemberRepository.findByAvatarId(avatarId);
    }
}
