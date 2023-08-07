package com.vvs.peekpick.picker.repository;

import com.vvs.peekpick.entity.Chat;
import com.vvs.peekpick.picker.dto.ChatMemberDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ChatJpaRepository extends JpaRepository<Chat, String> {

    @Query("SELECT new com.vvs.peekpick.picker.dto.ChatMemberDto(c.senderId, c.receiverId) FROM Chat c " +
            "WHERE c.roomId = :roomId")
    Optional<ChatMemberDto> findMembersByRoomId(@Param("roomId") String roomId);
}
