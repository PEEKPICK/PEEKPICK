package com.vvs.peekpick.peek.repository;

import com.vvs.peekpick.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PeekMemberRepository extends JpaRepository<Member, Long> {
   Optional<Member> findByNameAndProvider(String username, String provider);
}
