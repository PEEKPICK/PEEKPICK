package com.vvs.peekpick.exception;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomException extends RuntimeException   {

    ExceptionStatus exceptionStatus;
}
