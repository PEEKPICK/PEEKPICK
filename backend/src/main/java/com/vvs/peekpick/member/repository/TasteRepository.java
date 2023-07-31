package com.vvs.peekpick.member.repository;

import com.vvs.peekpick.entity.Taste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TasteRepository extends JpaRepository<Taste, Long> {
}