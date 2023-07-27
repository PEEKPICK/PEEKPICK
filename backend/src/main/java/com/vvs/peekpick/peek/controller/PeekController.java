package com.vvs.peekpick.peek.controller;

import com.vvs.peekpick.peek.dto.PeekDto;
import com.vvs.peekpick.peek.dto.PeekLocationDto;
import com.vvs.peekpick.peek.service.PeekRedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/peek")
@RequiredArgsConstructor
public class PeekController {

    private final PeekRedisService peekRedisService;

    //내 주변 Peek 찾기
    @GetMapping
    public ResponseEntity<List<PeekDto>> findNearPeek(@RequestBody Point point, @RequestParam double radius) {
        List<PeekDto> peekDtoList = peekRedisService.findNearPeek(point, radius);
        return new ResponseEntity<>(peekDtoList, HttpStatus.OK);
    }

    //Peek 작성
    @PostMapping
    public ResponseEntity<Void> addPeek(@RequestBody PeekLocationDto peekLocationDto, @RequestBody PeekDto peekDto) {
        peekRedisService.addPeek(peekLocationDto, peekDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //id로 Peek 찾기
    @GetMapping("/{peekId}")
    public ResponseEntity<PeekDto> findPeekById(@PathVariable Long peekId) {
        PeekDto peekDto = peekRedisService.findPeekById(peekId);
        return new ResponseEntity<>(peekDto, HttpStatus.OK);
    }

    //Peek 삭제
    @DeleteMapping("/{peekId}")
    public ResponseEntity<Void> deletePeek(@PathVariable Long peekId) {
        peekRedisService.deletePeek(peekId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //Peek 반응 추가
    @PutMapping("/{peekId}/reaction")
    public ResponseEntity<Void> addReaction(@PathVariable Long peekId, @RequestParam boolean like, @RequestParam int count) {
        peekRedisService.addReaction(peekId, like, count);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
