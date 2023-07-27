package com.vvs.peekpick.member.service;

import com.vvs.peekpick.entity.*;
import com.vvs.peekpick.member.dto.SignUpDto;

import java.util.List;


public interface MemberService {
    Avatar signup(SignUpDto signUpDto);
    Emoji RandomEmoji();
    Prefix RandomPrefix();

    List<World> RandomWorld();

    Member getMemberInfo(Long memberId);

    List<Category> categoryList();
}
