import React from "react";
import { toast } from "react-toastify";
import classes from "./ToastNotification.module.css";
import { customAxios } from "../../api/customAxios";

const CustomToast = ({ senderId, message }) => {
  const handleAccept = () => {
    const body = {
      requestSenderId: 1,
      requestReceiverId: 2,
      requestTime: "2023-07-31T14:20:00.1685066",
      response: "Y",
    };
    customAxios.put("/picker/chat-reponse", body).then((res) => {});
    toast.dismiss();
  };

  const handleReject = () => {
    const body = {
      requestSenderId: 1,
      requestReceiverId: 2,
      requestTime: "2023-07-31T14:20:00.1685066",
      response: "N",
    };
    customAxios.put("/picker/chat-reponse", body).then((res) => {});
    toast.clearWaitingQueue(senderId);
  };

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
