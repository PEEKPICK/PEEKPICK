package com.vvs.peekpick.report.service;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.entity.Report;
import com.vvs.peekpick.entity.ReportCategory;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.member.service.MemberService;
import com.vvs.peekpick.peek.dto.PeekRedisDto;
import com.vvs.peekpick.peek.service.PeekRedisService;
import com.vvs.peekpick.report.dto.RequestReportDto;
import com.vvs.peekpick.report.repository.ReportCategoryRepository;
import com.vvs.peekpick.report.repository.ReportMemberRepository;
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
import java.util.Optional;

public interface ReportService  {


    DataResponse allCategory();

    ReportCategory findCategoryById(Long reportCategoryId);
    
    @Transactional
    public Report saveReport(Report report);

    CommonResponse peekReport(Long memberId, Long peekId, RequestReportDto requestReportDto);

    CommonResponse chatReport(Long memberId, String roomId, RequestReportDto requestReportDto);
}
