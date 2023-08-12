package com.vvs.peekpick.report.controller;

import com.vvs.peekpick.report.dto.RequestReportDto;
import com.vvs.peekpick.report.service.ReportService;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
@AllArgsConstructor
public class ReportController {
    private final ReportService reportService;


    //신고 카테고리 리스트
    @GetMapping
    public ResponseEntity<DataResponse> getAllCategory() {
        return ResponseEntity.ok(reportService.allCategory());
    }

    // 특정 peek 신고
    @PostMapping("/peek/{peekId}")
    public ResponseEntity<CommonResponse> reportPeek(Authentication authentication, @PathVariable Long peekId, @RequestBody RequestReportDto requestReportDto) { //@AuthenticationPrincipal Principal principal
        Long memberId = Long.parseLong(authentication.getCredentials().toString());
        return ResponseEntity.ok(reportService.peekReport(memberId, peekId, requestReportDto));
    }

    // 특정 Chat 신고
    @PostMapping("/picker/{chatroomId}")
    public ResponseEntity<CommonResponse> reportChat(Authentication authentication, @PathVariable String roomId, @RequestBody RequestReportDto requestReportDto) { //@AuthenticationPrincipal Principal principal
        Long memberId = Long.parseLong(authentication.getCredentials().toString());
        return ResponseEntity.ok(reportService.chatReport(memberId, roomId, requestReportDto));
    }

}
