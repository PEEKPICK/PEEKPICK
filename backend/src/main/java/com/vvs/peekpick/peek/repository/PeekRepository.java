package com.vvs.peekpick.peek.repository;

import com.vvs.peekpick.entity.Peek;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeekRepository extends JpaRepository<Peek, Long> {
}
