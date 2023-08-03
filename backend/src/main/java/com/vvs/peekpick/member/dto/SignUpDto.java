package com.vvs.peekpick.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class SignUpDto {
    private String email;
    private String name;
    private String gender;
    private String phone;
    private String birthday;
    private String provider;

    private int emojiId;
    private int prefixId;
    private String nickname;
    private List<Integer> likes;
    private List<Integer> disLikes;
}
