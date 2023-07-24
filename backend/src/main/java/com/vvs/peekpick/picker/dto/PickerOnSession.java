package com.vvs.peekpick.picker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@AllArgsConstructor
@RedisHash(value = "Picker")
public class PickerOnSession {

    private Long memberId;
    private double lat;
    private double lng;

}
