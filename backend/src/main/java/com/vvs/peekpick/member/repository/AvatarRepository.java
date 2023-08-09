package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {
    @Modifying
    @Query("UPDATE Avatar a " +
           "SET a.world.worldId = :worldId " +
           "WHERE a.avatarId = :avatarId")
    void updateWorldByAvatarId(@Param("avatarId") Long avatarId,
                               @Param("worldId") int worldId);
}
