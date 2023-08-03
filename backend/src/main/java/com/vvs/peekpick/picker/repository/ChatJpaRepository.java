package com.vvs.peekpick.picker.repository;

import com.vvs.peekpick.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatJpaRepository extends JpaRepository<Chat, String> {
}
