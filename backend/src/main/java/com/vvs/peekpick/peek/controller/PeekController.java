package com.vvs.peekpick.peek.controller;

import com.vvs.peekpick.peek.dto.RequestPeekDto;
import com.vvs.peekpick.peek.dto.SearchPeekDto;
import com.vvs.peekpick.peek.service.PeekRedisService;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/peek")
@RequiredArgsConstructor
public class PeekController {

    private final PeekRedisService peekRedisService;

    @PostMapping
    public ResponseEntity<DataResponse> findNearPeek(@RequestBody SearchPeekDto searchPeekDto) {  //@AuthenticationPrincipal Principal principal
        String memberId = "testMemberId";//principal.getName();
        return ResponseEntity.ok(peekRedisService.findNearPeek(memberId, searchPeekDto));
    }


    @GetMapping("/{peekId}")
    public ResponseEntity<DataResponse> getPeek(@PathVariable Long peekId) { //@AuthenticationPrincipal Principal principal
        String memberId = "testMemberId";//principal.getName();
        return ResponseEntity.ok(peekRedisService.getPeek(memberId, peekId));
    }

    @DeleteMapping("/{peekId}")
    public ResponseEntity<CommonResponse> deletePeek(@PathVariable Long peekId) {
        return ResponseEntity.ok(peekRedisService.deletePeek(peekId));
    }

    @PostMapping("/write")
    public ResponseEntity<CommonResponse> addPeek(@RequestBody RequestPeekDto requestPeekDto) {
        return ResponseEntity.ok(peekRedisService.addPeek(requestPeekDto));
    }

    @PostMapping("/{peekId}")
    public ResponseEntity<CommonResponse> addReaction(@PathVariable Long peekId, @RequestBody Map<String, Object> reaction) {
        Long memberId = Long.parseLong(reaction.get("memberId").toString());
        boolean like = Boolean.parseBoolean(reaction.get("like").toString());
        boolean add = Boolean.parseBoolean(reaction.get("add").toString());
        return ResponseEntity.ok(peekRedisService.addReaction(peekId, memberId, like, add));
    }

}
