package com.vvs.peekpick.peek.repository;

import com.vvs.peekpick.entity.Peek;
import com.vvs.peekpick.peek.dto.PeekRedisDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeekJpaRepository extends JpaRepository<Peek, Long> {
}
