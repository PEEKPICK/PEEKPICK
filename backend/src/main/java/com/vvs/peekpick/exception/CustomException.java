package com.vvs.peekpick.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomException extends RuntimeException   {

    ExceptionStatus exceptionStatus;
}
