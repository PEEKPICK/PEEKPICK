package com.vvs.peekpick.picker.controller;

import com.vvs.peekpick.picker.dto.PickerOnSession;
import com.vvs.peekpick.picker.service.PickerService;
import com.vvs.peekpick.response.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/picker")
@RequiredArgsConstructor
public class PickerController {

    private final PickerService pickerServiceImpl;

    @PostMapping
    public DataResponse<List> getPickerByDistance(@RequestBody PickerOnSession picker) {
        DataResponse<List> dataResponse = new DataResponse<>();
        return dataResponse;
    }
}
