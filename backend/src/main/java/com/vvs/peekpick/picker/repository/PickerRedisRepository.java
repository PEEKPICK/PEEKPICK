package com.vvs.peekpick.picker.repository;

import com.vvs.peekpick.picker.dto.PickerOnSession;
import org.springframework.data.repository.CrudRepository;

public interface PickerRedisRepository extends CrudRepository<PickerOnSession, Long> {
}
