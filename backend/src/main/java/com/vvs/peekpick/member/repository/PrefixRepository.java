package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Prefix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PrefixRepository extends JpaRepository<Prefix, Long> {
    Optional<Prefix> findById(long prefixId);

    @Query(value = "SELECT * FROM prefix ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<Prefix> getRandomEmoji();
}
