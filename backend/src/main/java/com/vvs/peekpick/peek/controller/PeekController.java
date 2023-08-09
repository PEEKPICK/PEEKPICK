package com.vvs.peekpick.peek.controller;

import com.vvs.peekpick.peek.dto.RequestPeekDto;
import com.vvs.peekpick.peek.dto.RequestSearchPeekDto;
import com.vvs.peekpick.peek.service.PeekService;
import com.vvs.peekpick.report.dto.RequestReportDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.util.AwsS3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

//@Slf4j
@RestController
@RequestMapping("/peek")
@RequiredArgsConstructor
public class PeekController {

    private final AwsS3Util awsS3Util;

    private final PeekService peekService;

    //내 주변 peek 가져오기
    @PostMapping
    public DataResponse findNearPeek(Authentication authentication, @RequestBody RequestSearchPeekDto requestSearchPeekDto) {
        Long memberId = Long.parseLong(authentication.getCredentials().toString());
        return peekService.findNearPeek(memberId, requestSearchPeekDto);
    }

//    // peek 작성
    @PostMapping(value = "/write")
    public CommonResponse addPeek(Authentication authentication, RequestPeekDto requestPeekDto, MultipartFile img) throws IOException {
        Long memberId = Long.parseLong(authentication.getCredentials().toString());

        System.out.println(requestPeekDto);
        // 파일을 S3에 저장하고 URL 가져옴
        String imageUrl = null;
        // 파일이 제공되면 S3에 저장하고 URL 가져옴
        if (img != null && !img.isEmpty()) {
            imageUrl = awsS3Util.s3SaveFile(img);
        }

        // RDB, Redis에 Peek 정보를 저장
        return peekService.addPeek(memberId, requestPeekDto, imageUrl);
    }

    // 특정 peek 세부 내용 가져오기
    @GetMapping("/{peekId}")
    public DataResponse getPeek(Authentication authentication, @PathVariable Long peekId) {
        Long avatarId = Long.parseLong(authentication.getName());
        Long memberId = Long.parseLong(authentication.getCredentials().toString());
        peekService.getPeek(memberId, avatarId, peekId);
    }

    // 특정 peek 삭제
    @DeleteMapping("/{peekId}")
    public CommonResponse deletePeek(Authentication authentication, @PathVariable Long peekId) {
        Long memberId = Long.parseLong(authentication.getCredentials().toString());
        return peekService.deletePeek(memberId, peekId);
    }

    // 특정 peek 좋아요/싫어요
    @PostMapping("/{peekId}")
    public CommonResponse addReaction(Authentication authentication, @PathVariable Long peekId, @RequestBody Map<String, Object> reaction) {//@AuthenticationPrincipal Principal principal
        Long memberId = Long.parseLong(authentication.getCredentials().toString());
        boolean like = Boolean.parseBoolean(reaction.get("like").toString());
        return peekService.addReaction(memberId, peekId, like);
    }
}
