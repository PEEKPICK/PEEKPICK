import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import classes from "./ToastNotification.module.css";
import { customAxios } from "../../api/customAxios";
import { chatActions } from "../../store/chatSlice";
const CustomToast = ({ message, senderId, requestTime }) => {
  const dispatch = useDispatch();
  const getOpponent = useSelector((state) => state.roomId.opponent);
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

      const response1 = await customAxios.post("/picker/chat-response", body);
      console.log("채팅 수락: ", response1.data);

      const roomId = response1.data.data.roomId;
      const opponent = response1.data.data.opponent;

      dispatch(chatActions.callRoomID(roomId));
      dispatch(chatActions.updateOpponent(opponent));
      dispatch(chatActions.updateConnectState(true));
      console.log("roomId보냄", roomId);
      console.log("opponen보냄", getOpponent);

      const response2 = await customAxios.get(`/member/chat/info?avatarId=${opponent}`);
      console.log("response2", response2);
      console.log("getOpponent", getOpponent);
      const opponentData = response2.data.data;
      console.log("aaaaa", opponentData);
      dispatch(chatActions.updateURL(opponentData));
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

      // console.log("body", body);
      await customAxios.post("/picker/chat-response", body).then((response) => {
        console.log("채팅 거절 : ", response.data);
      });
    } catch (error) {
      console.error(error);
    }
    toast.dismiss({ containerId: "an  Id" });
  };

  //모두 닫기
  const handleRejectAll = async () => {
    try {
      const res = await customAxios.get("/member/info");
      const receiverID = res.data.data.avatarId;
      const body = {
        requestSenderId: senderId,
        requestReceiverId: receiverID,
        requestTime: requestTime,
        response: "N",
      };

      // console.log("body", body);
      const response = await customAxios.post("/picker/chat-response", body);
      console.log("채팅 거절", response.data);
    } catch (error) {
      console.error(error);
    }
    toast.dismiss({ containerId: "an Id" });
  };
  return (
    <div className={classes.toastMain}>
      <div>{message}</div>
      <div>{senderId}</div>
      {senderId && requestTime && (
        <>
          <button onClick={handleAccept}>수락</button>
          <button onClick={handleReject}>거절</button>
          <button onClick={handleRejectAll}>모두거절</button>
        </>
      )}
    </div>
  );
};

export default CustomToast;
