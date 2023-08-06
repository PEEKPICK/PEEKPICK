package com.vvs.peekpick.report.service;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.entity.Report;
import com.vvs.peekpick.entity.ReportCategory;
import com.vvs.peekpick.member.service.MemberService;
import com.vvs.peekpick.peek.dto.PeekRedisDto;
import com.vvs.peekpick.report.dto.RequestReportDto;
import com.vvs.peekpick.report.repository.ReportCategoryRepository;
import com.vvs.peekpick.report.repository.ReportRepository;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class ReportService  {

    private final ReportRepository reportRepository;
    private final ReportCategoryRepository reportCategoryRepository;
    private final ResponseService responseService;
    public DataResponse allCategory() {
        return responseService.successDataResponse(ResponseStatus.GET_CATEGORY_SUCCESS, reportCategoryRepository.findAll());
    }

    public ReportCategory findCategoryById(Long reportCategoryId) {
        return reportCategoryRepository.findById(reportCategoryId)
                .orElseThrow(() -> new IllegalArgumentException("ReportCategory not found"));
    }
    @Transactional
    public Report saveReport(Report report) {
        return reportRepository.save(report);
    }


}
