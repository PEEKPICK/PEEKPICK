package com.vvs.peekpick.peek.repository;

import com.vvs.peekpick.entity.Peek;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PeekRepository extends JpaRepository<Peek, Long> {
    List<Peek> findPeeksByMember_MemberId(Long memberId);
}
