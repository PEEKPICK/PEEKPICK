import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import classes from "./ToastNotification.module.css";
import { customAxios } from "../../api/customAxios";
import { chatActions } from "../../store/chatSlice";
// import { modalActions } from "../../store/modalSlice";

const CustomToast = ({ message, senderId, requestTime }) => {
  const dispatch = useDispatch();
  // const getOpponent = useSelector((state) => state.roomId.opponent);
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
      // console.log(body);
      const response1 = await customAxios.post("/picker/chat-response", body);
      // console.log("채팅 수락: ", response1.data);

      const roomId = response1.data.data.roomId;
      const opponent = response1.data.data.opponent;
      const createTime = response1.data.data.createTime;
      const endTime = response1.data.data.endTime;
      // console.log("createTime", createTime);
      // console.log("endTime", endTime);
      dispatch(chatActions.callRoomID(roomId));
      dispatch(chatActions.updateConnectState(true));
      dispatch(chatActions.updateOpponent(opponent));
      dispatch(chatActions.updateEndTime(endTime));
      dispatch(chatActions.updateTime(createTime));
      // console.log("roomId보냄", roomId);
      // console.log("opponen보냄", getOpponent);

      const response2 = await customAxios.get(`/member/chat/info?avatarId=${opponent}`);
      // console.log("response2", response2);
      // console.log("getOpponent", getOpponent);
      const opponentData = response2.data.data;
      // console.log("상대정보: ", opponentData);
      const nickNameSum = `${opponentData.prefix.content} ${opponentData.nickname}`;
      dispatch(chatActions.updateURL(opponentData));
      dispatch(chatActions.updateOpponentNickName(nickNameSum));
    } catch (error) {
      console.error(error);
    }
    toast.dismiss({ containerId: "an Id" });
    dispatch(chatActions.updateChatModalState(true));
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
        // console.log("채팅 거절 : ", response.data);
      });
    } catch (error) {
      console.error(error);
    }
    toast.dismiss({ containerId: "an  Id" });
    dispatch(chatActions.resetState());
  };

  return (
    <div className={classes.toastMain}>
      <div className={classes.message}>{message}</div>
      {senderId && requestTime && (
        <>
          <button onClick={handleAccept} className={classes.accept}>
            <img src="/img/checkmark.png" alt="" />
          </button>
          <button onClick={handleReject} className={classes.reject}>
            <img src="/img/cancel.png" alt="" />
          </button>
        </>
      )}
    </div>
  );
};

export default CustomToast;
