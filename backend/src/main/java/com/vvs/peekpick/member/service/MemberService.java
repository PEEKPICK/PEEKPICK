package com.vvs.peekpick.member.service;

import com.vvs.peekpick.entity.Avatar;
import com.vvs.peekpick.entity.Emoji;
import com.vvs.peekpick.entity.Prefix;
import com.vvs.peekpick.entity.World;
import com.vvs.peekpick.member.dto.SignUpDto;

import java.util.List;
import java.util.Optional;


public interface MemberService {
    Avatar signup(SignUpDto signUpDto);
    Emoji RandomEmoji();
    Prefix RandomPrefix();

    List<World> RandomWorld();
}
