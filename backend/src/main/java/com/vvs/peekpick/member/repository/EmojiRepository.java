package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmojiRepository extends JpaRepository<Emoji, Long> {
    Optional<Emoji> findById(long emojiId);

    @Query(value = "SELECT * FROM emoji ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<Emoji> getRandomEmoji();
}
