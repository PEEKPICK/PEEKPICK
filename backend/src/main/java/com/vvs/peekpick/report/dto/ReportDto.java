package com.vvs.peekpick.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ReportDto {
    //신고한 사람
    private Long memberId;

    //신고 당한 사람
    private Long victimId;

    //신고 카테고리 id
    private Long reportCategoryId;

    //신고 항목 타입 (Picker, Peek)
    private String contentType;

    //신고 항목 아이디
    private String reportContentId;

    //신고 세부 내용
    private String reportContent;
    
    //신고 시간
    private LocalDateTime reportTime;

    @Override
    public String toString() {
        return "ReportDto{" +
                "memberId=" + memberId +
                ", victimId=" + victimId +
                ", reportCategoryId=" + reportCategoryId +
                ", dataType='" + contentType + '\'' +
                ", reportContentId='" + reportContentId + '\'' +
                ", reportContent='" + reportContent + '\'' +
                ", reportTime=" + reportTime +
                '}';
    }
}
