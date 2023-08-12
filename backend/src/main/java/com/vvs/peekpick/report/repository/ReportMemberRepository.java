package com.vvs.peekpick.report.repository;

import com.vvs.peekpick.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReportMemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findById(Long id);
}
