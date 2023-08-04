package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.entity.Avatar;
import com.vvs.peekpick.entity.Member;

public interface PeekMemberService {
    Member findMember(Long memberId);
    Member findMemberByAvatarId(Long avatarId);
}
