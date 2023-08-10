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
    private String expireFlag;

    private static final String EXPIRED = "EXPIRED";


    public String toString(){
        return "Sender:"+this.sender+"\\dMessage:"+this.message+"\\dSendTime:"+this.sendTime.toString();
    }

    public void setSendTime(String sendTime){
        this.sendTime = sendTime;
    }

    public void expireMessage(){
        this.expireFlag = EXPIRED;
    }

    public void messageFiltering(String filteredMessage) {
        this.message = filteredMessage;
    }
}