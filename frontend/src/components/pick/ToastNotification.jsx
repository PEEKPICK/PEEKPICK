import React from "react";
import { toast } from "react-toastify";
import classes from "./ToastNotification.module.css";
import { customAxios } from "../../api/customAxios";

const CustomToast = ({ message, senderId, requestTime }) => {
  // 수락
  const handleAccept = async () => {
    //내 ID

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
      const response = await customAxios.put("/picker/chat-reponse", body);
      console.log("response", response);
    } catch (error) {
      console.error(error);
    }
    toast.dismiss({ containerId: "an Id" });
    console.log({ containerId: "an Id" });
  };

  // 거절
  const handleReject = () => {
    // const body = {
    //   requestSenderId: 1,
    //   requestReceiverId: 2,
    //   requestTime: "2023-07-31T14:20:00.1685066",
    //   response: "N",
    // };
    // customAxios.put("/picker/chat-reponse", body).then((res) => {});
    toast.dismiss({ containerId: "an Id" });
    console.log({ containerId: "an Id" });
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
