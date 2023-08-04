package com.vvs.peekpick.peek.repository;

import com.vvs.peekpick.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PeekMemberRepository extends JpaRepository<Member, Long> {
   Optional<Member> findByNameAndProvider(String username, String provider);
   @Query("SELECT m FROM Member m WHERE m.avatar.avatarId = :avatarId")
   Member findByAvatarId(@Param("avatarId") Long avatarId);

}
