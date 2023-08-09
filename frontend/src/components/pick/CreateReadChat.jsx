import Modal from "react-modal";
import classes from "./CreateReadChat.module.css";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../store/chatSlice";
import React, { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { customAxios } from "../../api/customAxios";

const CreateReadChat = ({ isModalState }) => {
  const dispatch = useDispatch();
  const newModalState = useSelector((state) => state.roomId.chatModalState);
  const getRoomId = useSelector((state) => state.roomId.roomId);
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const isSelectedEmoji = useSelector((state) => state.modal.selectedEmoji);
  const chatPop = () => {
    console.log("getRoomId", getRoomId);
    console.log("isSelectedEmoji", isSelectedEmoji);
    dispatch(chatActions.updateChatModalState(!isModalState));
  };

  const handleCloseModal = () => {
    dispatch(chatActions.updateChatModalState(!isModalState));
  };

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(`https://i9b309.p.ssafy.io/ws`);
      const client = Stomp.over(socket);

      client.connect({}, (frame) => {
        setStompClient(client);
        client.subscribe(`/sub/chat/room/${getRoomId}`, (chatMessage) => {
          console.log("니가 보낸거!!!!!!!!!!!!", JSON.parse(chatMessage.body));
          showMessage(JSON.parse(chatMessage.body));
        });
      });
    };
    connect();
  }, [getRoomId]);

  useEffect(() => {
    const disconnect = () => {
      if (stompClient !== null) {
        stompClient.disconnect();
        setReceivedMessages([]);
      }
    };
    disconnect();
    /* eslint-disable-next-line */
  }, []);

  const joinChatRoom = () => {
    if (stompClient) {
      stompClient.send(
        "/pub/chat/publish",
        {},
        JSON.stringify({
          roomId: getRoomId,
          sender: "",
          message: message,
          sendTime: "",
          expireFlag: "",
        })
      );
      console.log("joinChatRoom", message);
      setMessage("");
    }
  };

  const showMessage = (message) => {
    setReceivedMessages((prevMessages) => [...prevMessages, message]);
  };

  const declare = () => {
    const requestBody = {
      roomId: getRoomId,
    };

    customAxios
      .post("/picker/chat-end", requestBody)
      .then(() => {
        console.log("요청 성공:", "나가기 성공");
        // 요청이 성공했을 때 실행할 코드 작성
        dispatch(chatActions.callRoomID(""));
      })
      .catch(() => {
        console.error("요청 실패:", "나가기 실패");
        // 요청이 실패했을 때 실행할 코드 작성
      });
  };

  return (
    <Modal
      isOpen={newModalState}
      onRequestClose={() => handleCloseModal()} // 모달 바깥을 클릭하거나 ESC 키를 누르면 모달을 닫음
      contentLabel="Selected Emoji Modal"
      className={classes.chatMain}
    >
      <div className={classes.chatHeader}>
        <button onClick={() => declare()}>
          <img src="img/cancel.png" alt="나가기" />
        </button>
        <h4 className={classes.time}>9:49</h4>
        <button className={classes.siren}>
          <img src="img/siren.png" alt="신고" />
        </button>
        <button onClick={() => chatPop()}>
          <img src="img/down.png" alt="내리기" />
        </button>
      </div>
      <div className={classes.divider} />
      <div>
        <ul id="messageList" className={classes.chat}>
          {receivedMessages.map((message, index) => (
            <div className={classes.chatBubble}>
              {message.sender === "self" ? (
                <>
                  <li key={index} className={classes.selfMessage}>
                    {message.message}
                  </li>
                </>
              ) : (
                <>
                  <img src="img/down.png" alt="나가기" key={index} className={classes.otherIcon} />
                  <li key={index} className={classes.otherMessage}>
                    {message.message}
                  </li>
                </>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className={classes.sendBar}>
        <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={joinChatRoom} />
      </div>
    </Modal>
  );
};

export default CreateReadChat;
