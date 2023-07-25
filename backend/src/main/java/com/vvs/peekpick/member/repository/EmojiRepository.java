package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmojiRepository extends JpaRepository<Emoji, Long> {
    Optional<Emoji> findById(long emojiId);
}
