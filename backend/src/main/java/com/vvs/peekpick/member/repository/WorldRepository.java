package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.World;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorldRepository extends JpaRepository<World, Long> {
    Optional<World> findById(long worldId);
}
