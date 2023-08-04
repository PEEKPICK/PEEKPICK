package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
   Optional<Member> findById(Long id);
   Optional<Member> findByNameAndProvider(String username, String provider);

    Optional<Member> findByEmail(String email);
    @Query("SELECT m FROM Member m WHERE m.avatar.avatarId = :avatarId")
    Optional<Member> findByAvatarId(Long avatarId);
}
