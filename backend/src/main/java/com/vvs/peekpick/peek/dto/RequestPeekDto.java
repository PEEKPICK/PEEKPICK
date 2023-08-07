package com.vvs.peekpick.peek.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.geo.Point;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
public class RequestPeekDto {
    private String content;
    private double longitude; //경도
    private double latitude; //위도

}
