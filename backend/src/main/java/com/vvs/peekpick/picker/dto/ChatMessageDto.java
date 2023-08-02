package com.vvs.peekpick.picker.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ChatMessageDto {

    private String roomId;
    private String sender;
    private String message;
    private LocalDateTime sendTime;

    public String toString(){
        return "Sender:"+this.sender+"\\dMessage:"+this.message+"\\dSendTime:"+this.sendTime.toString();
    }

    public void setSendTime(LocalDateTime sendTime){
        this.sendTime = sendTime;
    }

}