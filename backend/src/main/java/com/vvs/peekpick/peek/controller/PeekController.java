package com.vvs.peekpick.peek.controller;

import com.vvs.peekpick.peek.dto.PeekRedisDto;
import com.vvs.peekpick.peek.service.PeekRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/peek")
@RequiredArgsConstructor
public class PeekController {
    private final PeekRedisService peekRedisService;

}
