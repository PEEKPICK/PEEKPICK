package com.vvs.peekpick.peek.repository;

import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.peek.dto.PeekRedisDto;
import org.springframework.data.repository.CrudRepository;

public interface PeekLocationRepository extends CrudRepository<PeekLocationDto, Long> {
}
