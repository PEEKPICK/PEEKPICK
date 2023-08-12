package com.vvs.peekpick.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class RequestReportDto {
    //신고 카테고리 id
    private Long reportCategoryId;

    //신고 세부 내용
    private String reportContent;

    @Override
    public String toString() {
        return "RequestReportDto{" +
                "reportCategoryId=" + reportCategoryId +
                ", reportContent='" + reportContent + '\'' +
                '}';
    }
}
