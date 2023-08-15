package com.vvs.peekpick.entity;

import com.sun.istack.NotNull;
import com.vvs.peekpick.member.dto.SignUpDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String email;
    private String name;
    private String gender;
    private String phone;
    private String birthday;
    private String provider;

    @OneToOne
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achievement_id")
    private Achievement achievement;

    public void updateMember(SignUpDto signUpDto, Avatar avatar, Achievement achievement) {
        this.avatar = avatar;
        this.achievement = achievement;
        this.gender = signUpDto.getGender();
        this.phone = signUpDto.getPhone();
        this.birthday = signUpDto.getBirthday();
    }

    @NotNull
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
    @Override
    public String toString() {
        return "Member{" +
                "memberId=" + memberId +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                ", phone='" + phone + '\'' +
                ", birthday='" + birthday + '\'' +
                ", provider='" + provider + '\'' +
                ", avatar=" + avatar +
                ", achievement=" + achievement +
                '}';
    }
}
