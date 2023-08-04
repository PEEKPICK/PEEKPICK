package com.vvs.peekpick.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberInfoToken {
    private Long avatarId;
    private Long memberId;
}
