package com.vvs.peekpick.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    private Long memberId;
    private Long victimId;

    @Column(length = 1)
    private String reportType;

    @Column(length = 1)
    private String dataType;

    private String reportContentId;

    private String reportContent;

    private LocalDateTime reportTime;
}
