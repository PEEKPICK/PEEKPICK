package com.vvs.peekpick.picker.repository;

import com.vvs.peekpick.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickerJpaRepository extends JpaRepository<Member, Long> {

}
