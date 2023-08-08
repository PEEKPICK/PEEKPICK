import React from "react";
import { toast } from "react-toastify";
import classes from "./ToastNotification.module.css";
import { customAxios } from "../../api/customAxios";

const CustomToast = ({ message, senderId, requestTime }) => {
  // 수락
  const handleAccept = async () => {
    try {
      const res = await customAxios.get("/member/info");
      const receiverID = res.data.data.avatarId;
      const body = {
        requestSenderId: senderId,
        requestReceiverId: receiverID,
        requestTime: requestTime,
        response: "Y",
      };

      console.log("body", body);
      const response = await customAxios.post("/picker/chat-response", body);
      console.log("채팅 수락", response.data);
    } catch (error) {
      console.error(error);
    }
    toast.dismiss({ containerId: "an Id" });
  };

  // 거절
  const handleReject = async () => {
    try {
      const res = await customAxios.get("/member/info");
      const receiverID = res.data.data.avatarId;
      const body = {
        requestSenderId: senderId,
        requestReceiverId: receiverID,
        requestTime: requestTime,
        response: "N",
      };

      console.log("body", body);
      const response = await customAxios.post("/picker/chat-response", body);
      console.log("채팅 거절", response.data);
    } catch (error) {
      console.error(error);
    }
    toast.dismiss({ containerId: "an Id" });
  };

  //모두 닫기
  const handleRejectAll = () => {
    toast.dismiss();
  };
  return (
    <div className={classes.toastMain}>
      <div>{message}</div>
      <div>{senderId}</div>
      <button onClick={handleAccept}>수락</button>
      <button onClick={handleReject}>거절</button>
      <button onClick={handleRejectAll}>모두거절</button>
    </div>
  );
};

export default CustomToast;
