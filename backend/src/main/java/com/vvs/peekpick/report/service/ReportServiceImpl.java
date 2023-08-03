package com.vvs.peekpick.report.service;

import com.vvs.peekpick.entity.Report;
import com.vvs.peekpick.entity.ReportCategory;
import com.vvs.peekpick.report.repository.ReportCategoryRepository;
import com.vvs.peekpick.report.repository.ReportRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final ReportCategoryRepository reportCategoryRepository;

    public ReportCategory findReportCategory(Long reportCategoryId) {
        return reportCategoryRepository.findById(reportCategoryId)
                .orElseThrow(() -> new IllegalArgumentException("ReportCategory not found"));
    }
    @Transactional
    public Report saveReport(Report report) {
        return reportRepository.save(report);
    }
}
