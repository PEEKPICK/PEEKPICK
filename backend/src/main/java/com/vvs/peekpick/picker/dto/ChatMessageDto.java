package com.vvs.peekpick.picker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDto {

    private String roomId;
    private String sender;
    private String message;
    private String sendTime;

    public String toString(){
        return "Sender:"+this.sender+"\\dMessage:"+this.message+"\\dSendTime:"+this.sendTime.toString();
    }

    public void setSendTime(String sendTime){
        this.sendTime = sendTime;
    }

}