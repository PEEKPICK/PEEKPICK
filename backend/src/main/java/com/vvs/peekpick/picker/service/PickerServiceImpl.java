package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.picker.repository.PickerJpaRepository;
import com.vvs.peekpick.picker.repository.PickerRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickerServiceImpl implements PickerService{

    private final PickerJpaRepository pickerJpaRepository;
    private final PickerRedisRepository pickerRedisRepository;


}
