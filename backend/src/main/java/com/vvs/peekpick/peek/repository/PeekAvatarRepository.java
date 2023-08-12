package com.vvs.peekpick.peek.repository;

import com.vvs.peekpick.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeekAvatarRepository extends JpaRepository<Avatar, Long> {
}
