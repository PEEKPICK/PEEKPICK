package com.vvs.peekpick.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
