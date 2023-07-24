package com.vvs.peekpick.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomException extends RuntimeException   {

    ExceptionStatus exceptionStatus;
}
