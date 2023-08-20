package com.vvs.peekpick.picker.dto;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash(value = "Picker")
public class ConnectingPickerDto {

    @Id
    private Long avatarId;
    private Point point;

    public void setAvatarId(Long avatarId) {
        this.avatarId = avatarId;
    }
}
