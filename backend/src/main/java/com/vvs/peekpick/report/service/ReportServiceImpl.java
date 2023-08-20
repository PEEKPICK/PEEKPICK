package com.vvs.peekpick.report.service;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.entity.Report;
import com.vvs.peekpick.entity.ReportCategory;
import com.vvs.peekpick.peek.dto.PeekRedisDto;
import com.vvs.peekpick.peek.service.PeekRedisService;
import com.vvs.peekpick.picker.dto.ChatMemberDto;
import com.vvs.peekpick.picker.dto.ChatRoomDto;
import com.vvs.peekpick.picker.service.ChatService;
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

@Slf4j
@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService{

    private final ReportRepository reportRepository;
    private final ReportCategoryRepository reportCategoryRepository;
    private final ReportMemberRepository reportMemberRepository;
    private final ResponseService responseService;
    private final PeekRedisService peekRedisService;
    private final ChatService chatService;

    @Override
    public DataResponse allCategory() {
        return responseService.successDataResponse(ResponseStatus.GET_CATEGORY_SUCCESS, reportCategoryRepository.findAll());
    }

    @Override
    public ReportCategory findCategoryById(Long reportCategoryId) {
        return reportCategoryRepository.findById(reportCategoryId)
                .orElseThrow(() -> new IllegalArgumentException("ReportCategory not found"));
    }

    @Override
    @Transactional
    public Report saveReport(Report report) {
        return reportRepository.save(report);
    }

    @Override
    public CommonResponse peekReport(Long memberId, Long peekId, RequestReportDto requestReportDto) {
        // 신고당한 Peek 조회
        PeekRedisDto peekRedisDto = peekRedisService.getPeek(peekId);

        // 신고한 사람
        Member member = reportMemberRepository.findById(memberId).orElseThrow();

        // 신고 당한 사람
        Member victim = reportMemberRepository.findById(peekRedisDto.getMemberId()).orElseThrow();

        // 본인 Peek은 신고 불가
        if(victim.getMemberId().equals(member.getMemberId())) {
            return responseService.failureCommonResponse(ResponseStatus.REPORT_FAILURE);
        }

        ReportCategory reportCategory = findCategoryById(requestReportDto.getReportCategoryId());

        Report report = Report.builder()
                .member(member) //신고자
                .victim(victim) //피신고자
                .reportCategory(reportCategory) //reportCategory 객체
                .contetnType("P") //Peek
                .reportContentId(peekId.toString()) //Peek의 id
                .reportContent(requestReportDto.getReportContent()) //신고 내용
                .reportTime(LocalDateTime.now()) //신고 작성 시간
                .build();

        //report에 추가
        saveReport(report);
        return responseService.successCommonResponse(ResponseStatus.REGISTER_REPORT_SUCCESS);
    }

    @Override
    public CommonResponse chatReport(Long memberId, String roomId, RequestReportDto requestReportDto) {
        log.info("채팅방 번호 : {}",roomId);
        // 신고당한 chat room 조회
        ChatRoomDto chatRoomDto = chatService.getChatRoom(roomId);

        ChatMemberDto chatMemberDto = (ChatMemberDto) chatService.getMembersByRoomId(roomId).getData();
        // 신고한 사람
        Member member = reportMemberRepository.findById(memberId).orElseThrow();
        // 신고 당한 사람
        Member victim;
        if(chatMemberDto.getSenderId().equals(memberId)) victim = reportMemberRepository.findById(chatMemberDto.getSenderId()).orElseThrow();
        else victim = reportMemberRepository.findById(chatMemberDto.getReceiverId()).orElseThrow();

        ReportCategory reportCategory = findCategoryById(requestReportDto.getReportCategoryId());

        Report report = Report.builder()
                .member(member) //신고자
                .victim(victim) //피신고자
                .reportCategory(reportCategory) //reportCategory 객체
                .contetnType("C") //chat
                .reportContentId(roomId) //chat의 id
                .reportContentId("1")
                .reportContent(requestReportDto.getReportContent()) //신고 내용
                .reportTime(LocalDateTime.now()) //신고 작성 시간
                .build();
        log.info("신고 {}",report);
        //report에 추가
        saveReport(report);
        return responseService.successCommonResponse(ResponseStatus.REGISTER_REPORT_SUCCESS);
    }


}
