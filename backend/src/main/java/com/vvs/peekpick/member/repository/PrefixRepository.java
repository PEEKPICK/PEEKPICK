package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Prefix;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrefixRepository extends JpaRepository<Prefix, Long> {
    Optional<Prefix> findById(long prefixId);
}
