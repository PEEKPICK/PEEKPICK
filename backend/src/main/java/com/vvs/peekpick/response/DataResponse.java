package com.vvs.peekpick.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class DataResponse<T> extends CommonResponse{

    T data;
}
