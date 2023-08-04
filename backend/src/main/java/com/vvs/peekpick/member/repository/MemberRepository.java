package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
   Optional<Member> findById(Long id);
   Optional<Member> findByNameAndProvider(String username, String provider);

    Optional<Member> findByEmail(String email);
}
