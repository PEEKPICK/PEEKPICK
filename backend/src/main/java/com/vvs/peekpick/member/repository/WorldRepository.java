package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.World;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface WorldRepository extends JpaRepository<World, Long> {
    Optional<World> findById(long worldId);
}
