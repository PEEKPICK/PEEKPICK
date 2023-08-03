package com.vvs.peekpick.exception;

import com.vvs.peekpick.response.CommonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler(CustomException.class)
    public CommonResponse customExceptionHandler(CustomException e){
        CommonResponse response = new CommonResponse();
        response.setCode(e.getExceptionStatus().getCode());
        response.setMessage(e.getExceptionStatus().getMessage());
        return response;
    }

    /* 어디에서도 잡지 못한 예외 핸들링 */
    @ExceptionHandler(Exception.class)
    public CommonResponse exceptionHandler(Exception e) {
        // For logging
        log.info("{}", e.getStackTrace());
        CommonResponse response = new CommonResponse();
        response.setCode("9999");
        response.setMessage("예외가 발생했습니다.");
        return response;
    }
}