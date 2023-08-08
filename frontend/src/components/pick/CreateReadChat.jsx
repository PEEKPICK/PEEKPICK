import Modal from "react-modal";
import classes from "./CreateReadChat.module.css";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../store/chatSlice";
import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const CreateReadChat = (isModalState) => {
  const dispatch = useDispatch();
  const newModalState = useSelector((state) => state.roomId.chatModalState);
  const getRoomId = useSelector((state) => state.roomId.roomId);

  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleCloseModal = () => {
    dispatch(chatActions.updateChatModalState(!isModalState));
  };

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("https://i9b309.p.ssafy.io/ws"), // proxy를 통한 접속
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
      // debug: function (str) {
      //   console.log("debug : ", str);
      // },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error("frame", frame);
        dispatch(chatActions.updateConnectState(false));
      },
    });

    client.current.activate();
  };
  const disconnect = () => {
    client.current.deactivate();
    dispatch(chatActions.updateConnectState(false));
  };
  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${getRoomId}`, ({ body }) => {
      setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    });
  };

  const publish = (message) => {
    if (!client.current.connected) {
      console.log("!client.current.connected: ", message);
      return;
    }
    console.log("보낸 메시지!!!!! : ", message);
    client.current.publish({
      destination: "/pub/chat/publish",
      body: JSON.stringify({ roomId: getRoomId, message: message, sendTime: "" }),
    });
    console.log("보낸 getRoomId : ", getRoomId);
    console.log("보낸 message : ", message);
    setMessage("");
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);
  return (
    <Modal
      isOpen={newModalState}
      onRequestClose={() => handleCloseModal()} // 모달 바깥을 클릭하거나 ESC 키를 누르면 모달을 닫음
      contentLabel="Selected Emoji Modal"
      className={classes.test}
    >
      <div className={classes.chat}>
        {chatMessages && chatMessages.length > 0 && (
          <ul>
            {chatMessages.map((_chatMessage, index) => (
              <li key={index} className={classes.message}>
                {_chatMessage.message}
              </li>
            ))}
          </ul>
        )}
        <div>
          <input
            type={"text"}
            placeholder={"message"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                publish(message);
              }
            }}
          />
          <button onClick={() => publish(message)}>전송</button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateReadChat;
