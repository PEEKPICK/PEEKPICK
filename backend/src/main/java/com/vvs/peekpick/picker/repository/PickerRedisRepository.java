package com.vvs.peekpick.picker.repository;

import com.vvs.peekpick.picker.dto.ConnectingPickerDto;
import org.springframework.data.repository.CrudRepository;

public interface PickerRedisRepository extends CrudRepository<ConnectingPickerDto, Long> {
}
