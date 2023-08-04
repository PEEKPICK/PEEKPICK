package com.vvs.peekpick.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ReportCategoryDto {
    private Long reportCategoryId;
    private String reportCategoryName;
}
