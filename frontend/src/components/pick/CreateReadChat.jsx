import Modal from "react-modal";
import classes from "./CreateReadChat.module.css";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../store/chatSlice";
import React, { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useCallback } from "react";

const CreateReadChat = ({ isModalState }) => {
  const dispatch = useDispatch();
  const newModalState = useSelector((state) => state.roomId.chatModalState);
  const getRoomId = useSelector((state) => state.roomId.roomId);
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  const handleCloseModal = () => {
    dispatch(chatActions.updateChatModalState(!isModalState));
  };

  const connect = useCallback(() => {
    const socket = new SockJS(`https://i9b309.p.ssafy.io/ws`);
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      setStompClient(client);
      client.subscribe(`/sub/chat/room/${getRoomId}`, (chatMessage) => {
        console.log("니가 보낸거!!!!!!!!!!!!", JSON.parse(chatMessage.body));
        showMessage(JSON.parse(chatMessage.body));
      });
    });
  }, [getRoomId]);

  const disconnect = useCallback(() => {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
  }, [stompClient]);

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

  useEffect(() => {
    connect();
    return () => disconnect();
    /* eslint-disable-next-line */
  }, [setMessage]);

  return (
    <Modal
      isOpen={newModalState}
      onRequestClose={() => handleCloseModal()} // 모달 바깥을 클릭하거나 ESC 키를 누르면 모달을 닫음
      contentLabel="Selected Emoji Modal"
      className={classes.test}
    >
      <div>
        <h1>WebSocket Client</h1>
        <div>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={joinChatRoom}>Send</button>
        </div>
        <div>
          <h2>Received Messages:</h2>
          <ul id="messageList">
            {receivedMessages.map((message, index) => (
              <li key={index}>{message.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default CreateReadChat;
