package com.vvs.peekpick.peek.repository;

import com.vvs.peekpick.peek.dto.PeekRedisDto;
import org.springframework.data.repository.CrudRepository;



public interface PeekRedisRepository extends CrudRepository<PeekRedisDto, Long> {
}
