package com.vvs.peekpick.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reportCategoryId;
    private String reportCategoryName;

}
