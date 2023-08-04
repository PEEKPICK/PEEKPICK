package com.vvs.peekpick.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "victim_id")
    private Member victim;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reportCategor_id")
    private ReportCategory reportCategory;

    @Column(length = 1)
    private String contetnType;

    private String reportContentId;

    private String reportContent;

    private LocalDateTime reportTime;

}
