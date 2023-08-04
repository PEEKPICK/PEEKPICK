package com.vvs.peekpick.report.service;

import com.vvs.peekpick.entity.Report;
import com.vvs.peekpick.entity.ReportCategory;
import com.vvs.peekpick.report.repository.ReportCategoryRepository;
import com.vvs.peekpick.report.repository.ReportRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ReportService {

    ReportCategory findReportCategory(Long reportCategoryId);
    Report saveReport(Report report);
}
