package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Emoji;
import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.entity.Prefix;
import com.vvs.peekpick.entity.World;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
   Member findByEmail(String email);

   Optional<Member> findByNameAndProvider(String username, String provider);
}
