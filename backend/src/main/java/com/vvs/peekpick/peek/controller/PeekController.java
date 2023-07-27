package com.vvs.peekpick.peek.controller;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.peek.dto.SearchPeekDto;
import com.vvs.peekpick.peek.service.PeekRedisService;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/peek")
@RequiredArgsConstructor
public class PeekController {

    private final PeekRedisService peekRedisService;


    @PostMapping
    public ResponseEntity<DataResponse> findNearPeek(@RequestBody SearchPeekDto searchPeekDto) {
        return ResponseEntity.ok(peekRedisService.findNearPeek(searchPeekDto));
    }


    @GetMapping("/{peekId}")
    public ResponseEntity<DataResponse> findPeekById(@PathVariable Long peekId) {
        return ResponseEntity.ok(peekRedisService.getPeek(peekId));
    }

    @DeleteMapping("/{peekId}")
    public ResponseEntity<CommonResponse> deletePeek(@PathVariable Long peekId) {
        return ResponseEntity.ok(peekRedisService.deletePeek(peekId));
    }

    @PostMapping("/write")
    public ResponseEntity<CommonResponse> addPeek(@RequestBody PeekLocationDto peekLocationDto, @RequestBody PeekDto peekDto) {
        return ResponseEntity.ok(peekRedisService.addPeek(peekLocationDto, peekDto));
    }

    @PostMapping("/{peekId}/reaction")
    public ResponseEntity<CommonResponse> addReaction(@PathVariable Long peekId, @RequestParam boolean like, @RequestParam int count) {
        return ResponseEntity.ok(peekRedisService.addReaction(peekId, like, count));
    }
}
