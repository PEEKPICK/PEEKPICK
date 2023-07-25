package com.vvs.peekpick.picker.controller;

import com.vvs.peekpick.picker.dto.ConnectingPickerDto;
import com.vvs.peekpick.picker.dto.SearchPickerDto;
import com.vvs.peekpick.picker.service.PickerService;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/picker")
@RequiredArgsConstructor
public class PickerController {

    private final PickerService pickerServiceImpl;

    /* 접속시 서버 세션에 내 정보 추가 */
    @PostMapping("/connect")
    public CommonResponse connectSession(@RequestBody ConnectingPickerDto picker){
        return pickerServiceImpl.connectSession(picker);
    }

    /* 내 위치로부터 설정한 거리 이내 PICKER 조회 */
    @PostMapping
    public DataResponse<List> getPickerListByDistance(@RequestBody SearchPickerDto picker) {
        return pickerServiceImpl.getPickerListByDistance(picker);
    }
}
