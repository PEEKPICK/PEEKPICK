package com.vvs.peekpick.response;

import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    /* 정상 응답 - 데이터 미포함 */
    public CommonResponse successCommonResponse(ResponseStatus responseStatus){
        CommonResponse response = new CommonResponse();
        response.setCode(responseStatus.getCode());
        response.setMessage(responseStatus.getMessage());
        return response;
    }

    /* 정상 응답 - 데이터 포함 */
    public <T> DataResponse<?> successDataResponse(ResponseStatus responseStatus, T data){
        DataResponse<T> dataResponse = new DataResponse<>();
        dataResponse.setCode(responseStatus.getCode());
        dataResponse.setMessage(responseStatus.getMessage());
        dataResponse.setData(data);
        return dataResponse;
    }
}
