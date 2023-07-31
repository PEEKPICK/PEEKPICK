package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.picker.dto.ConnectingPickerDto;
import com.vvs.peekpick.picker.dto.SearchPickerDto;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface PickerService {

    CommonResponse connectSession(ConnectingPickerDto picker);

    DataResponse<List> getPickerListByDistance(SearchPickerDto picker);

    CommonResponse disconnectSession(ConnectingPickerDto picker);

    CommonResponse chatRequestSend(Long targetId, Object event);

    SseEmitter connectSseSession(Long memberId);
}
