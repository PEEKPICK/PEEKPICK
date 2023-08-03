package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.entity.Peek;

public interface PeekService {
    Long savePeek(Peek peek);
    Peek findPeek(Long peekId);
}
