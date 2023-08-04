package com.vvs.peekpick.peek.controller;

import com.vvs.peekpick.peek.dto.RequestPeekDto;
import com.vvs.peekpick.peek.dto.RequestSearchPeekDto;
import com.vvs.peekpick.peek.service.PeekRedisService;
import com.vvs.peekpick.report.dto.RequestReportDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.util.AwsS3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/peek")
@RequiredArgsConstructor
public class PeekController {

    private final AwsS3Util awsS3Util;

    private final PeekRedisService peekRedisService;

    //내 주변 peek 가져오기
    @PostMapping
    public ResponseEntity<DataResponse> findNearPeek(@RequestBody RequestSearchPeekDto requestSearchPeekDto) {
        Long memberId = 2L;
        return ResponseEntity.ok(peekRedisService.findNearPeek(memberId, requestSearchPeekDto));
    }

    // peek 작성
    @PostMapping(value = "/write", consumes = {"multipart/form-data"})
    public ResponseEntity<CommonResponse> addPeek(
            Authentication authentication,
            @RequestPart("peek") RequestPeekDto requestPeekDto,
            @RequestPart("img") MultipartFile img) {
        try {
            Long avatarId = Long.parseLong(authentication.getName());
            // 파일을 S3에 저장하고 URL 가져옴
            String imageUrl = awsS3Util.s3SaveFile(img);
            // RDB, Redis에 Peek 정보를 저장
            return ResponseEntity.ok(peekRedisService.addPeek(requestPeekDto, imageUrl));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null; //추후 예외 처리 추가 필요
        }
    }


    // 특정 peek 세부 내용 가져오기
    @GetMapping("/{peekId}")
    public ResponseEntity<DataResponse> getPeek(Authentication authentication, @PathVariable Long peekId) {
        Long avatarId = Long.parseLong(authentication.getName());
        return ResponseEntity.ok(peekRedisService.getPeek(avatarId, peekId));
    }

    // 특정 peek 삭제
    @DeleteMapping("/{peekId}")
    public ResponseEntity<CommonResponse> deletePeek(@PathVariable Long peekId) {
        return ResponseEntity.ok(peekRedisService.deletePeek(peekId));
    }

    // 특정 peek 좋아요/싫어요
    @PostMapping("/{peekId}")
    public ResponseEntity<CommonResponse> addReaction(@PathVariable Long peekId, @RequestBody Map<String, Object> reaction) {//@AuthenticationPrincipal Principal principal
        Long memberId = 2L;//principal.getName();
        boolean like = Boolean.parseBoolean(reaction.get("like").toString());
        return ResponseEntity.ok(peekRedisService.addReaction(peekId, memberId, like));
    }


    // 특정 peek 신고
    @PostMapping("/report/{peekId}")
    public ResponseEntity<CommonResponse> reportPeek(@PathVariable Long peekId, @RequestBody RequestReportDto requestReportDto) { //@AuthenticationPrincipal Principal principal
        Long memberId = 2L; //principal.getName();
        System.out.println(requestReportDto);
        return ResponseEntity.ok(peekRedisService.registerReport(memberId, peekId, requestReportDto));
    }
}
