package com.vvs.peekpick.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Taste {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tasteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;

    @Column(length = 1)
    private String type;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;
}