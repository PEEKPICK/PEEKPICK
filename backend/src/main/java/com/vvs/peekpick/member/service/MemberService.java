package com.vvs.peekpick.member.service;

import com.vvs.peekpick.entity.Avatar;
import com.vvs.peekpick.entity.Taste;
import com.vvs.peekpick.member.dto.SignUpDto;

import java.util.List;

public interface MemberService {
    Avatar signup(SignUpDto signUpDto);
}
