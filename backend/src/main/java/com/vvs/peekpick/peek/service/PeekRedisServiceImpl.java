package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.peek.repository.PeekJpaRepository;
import com.vvs.peekpick.peek.repository.PeekLocationRepository;
import com.vvs.peekpick.peek.repository.PeekRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PeekRedisServiceImpl implements PeekRedisService{

    private final PeekJpaRepository peekJpaRepository;
    private final PeekRedisRepository peekRedisRepository;
    private final PeekLocationRepository peekLocationRepository;

    public void saveLocation(PeekLocationDto peekLocationDto) {
        peekLocationRepository.save(peekLocationDto);
    }


}
