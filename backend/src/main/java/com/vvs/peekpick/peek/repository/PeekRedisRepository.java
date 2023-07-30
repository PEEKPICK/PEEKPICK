package com.vvs.peekpick.peek.repository;

import com.vvs.peekpick.peek.dto.PeekDto;
import org.springframework.data.repository.CrudRepository;

public interface PeekRedisRepository extends CrudRepository<PeekDto, Long> {
}
