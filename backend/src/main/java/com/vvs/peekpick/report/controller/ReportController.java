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

//
//    //Peek 신고 시
//    @PostMapping("/peek")
//    public ResponseEntity<CommonResponse> peekReport(@RequestBody RequestReportDto requestReportDto) {  //@AuthenticationPrincipal Principal principal
//        Long memberId = 1L;
//        String type = "P";
//        return ResponseEntity.ok(reportService.registerReport(memberId, type, requestReportDto));
//    }
//
//    //Picker 채팅 신고 시
//    @PostMapping("/picker")
//    public ResponseEntity<CommonResponse> chatReport(@RequestBody RequestReportDto requestReportDto) {  //@AuthenticationPrincipal Principal principal
//        Long memberId = 1L;
//        String type = "C";
//        return ResponseEntity.ok(reportService.registerReport(memberId, type, requestReportDto));
//    }
    //신고 카테고리 반환
    @GetMapping
    public ResponseEntity<DataResponse> getAllCategory() {
        return ResponseEntity.ok(reportService.allCategory());
    }

    // 특정 peek 신고
//    @PostMapping("/peek/{peekId}")
//    public ResponseEntity<CommonResponse> reportPeek(Authentication authentication, @PathVariable Long peekId, @RequestBody RequestReportDto requestReportDto) { //@AuthenticationPrincipal Principal principal
//        Long memberId = Long.parseLong(authentication.getCredentials().toString());
//        return ResponseEntity.ok(reportService.registerReport(memberId, peekId, "P", requestReportDto));
//    }
//
//    @PostMapping("/picker/{peekId}")
//    public ResponseEntity<CommonResponse> reportPicker(Authentication authentication, @PathVariable Long peekId, @RequestBody RequestReportDto requestReportDto) { //@AuthenticationPrincipal Principal principal
//        Long memberId = Long.parseLong(authentication.getCredentials().toString());
//        return ResponseEntity.ok(reportService.registerReport(memberId, peekId, "C", requestReportDto));
//    }
}
