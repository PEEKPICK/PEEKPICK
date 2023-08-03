package com.vvs.peekpick.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class TempSignUpDto {
    private String name;
    private String email;
    private String phone;
    private String birthday;
    private String gender;
}
