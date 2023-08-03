package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.RefreshToken;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    @Query("SELECT r FROM RefreshToken r WHERE r.avatar.avatarId = :avatarId")
    Optional<RefreshToken> findByAvatarId(@Param("avatarId") Long avatarId);

    @Modifying
    @Query("UPDATE RefreshToken r SET r.token = :token WHERE r.avatar.avatarId = :avatarId")
    void updateTokenByAvatarId(@Param("token") String token, @Param("avatarId") Long avatarId);
}
