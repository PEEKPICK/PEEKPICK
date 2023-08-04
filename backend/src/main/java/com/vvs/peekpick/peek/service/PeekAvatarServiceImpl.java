package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.entity.Avatar;
import com.vvs.peekpick.peek.repository.PeekAvatarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekAvatarServiceImpl implements PeekAvatarService{
    private final PeekAvatarRepository peekAvatarRepository;
    @Override
    public Avatar findAvatar(Long avatarId) {
        return peekAvatarRepository.findById(avatarId)
                .orElseThrow(() -> new IllegalArgumentException("Avatar not found"));
    }
}
