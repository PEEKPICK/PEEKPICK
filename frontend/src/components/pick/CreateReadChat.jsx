import Modal from "react-modal";
import classes from "./CreateReadChat.module.css";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../store/chatSlice";
import React, { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { customAxios } from "../../api/customAxios";
import { v4 as uuid } from "uuid";

const CreateReadChat = ({ isModalState }) => {
  const dispatch = useDispatch();
  const newModalState = useSelector((state) => state.roomId.chatModalState);
  const getRoomId = useSelector((state) => state.roomId.roomId);
  // const createTime = useSelector((state) => state.roomId.createTime);
  const EmojiForChat = useSelector((state) => state.roomId.opponentURL);
  const opponent = useSelector((state) => state.roomId.opponent);
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const chatPop = () => {
    console.log("getRoomId", getRoomId);
    console.log("opponent", opponent);
    console.log("EmojiForChat", EmojiForChat);
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
    /* eslint-disable-next-line */
  }, [getRoomId]);

  // useEffect(() => {
  //   const disconnect = () => {
  //     if (stompClient !== null) {
  //       stompClient.disconnect();
  //       setReceivedMessages([]);
  //     }
  //   };
  //   disconnect();
  //   /* eslint-disable-next-line */
  // }, []);

  useEffect(() => {
    setReceivedMessages([]); // roomId가 변경될 때마다 배열 초기화
  }, [getRoomId]);

  const joinChatRoom = () => {
    if (stompClient) {
      stompClient.send(
        "/pub/chat/publish",
        {},
        JSON.stringify({
          roomId: getRoomId,
          sender: opponent,
          message: message,
          sendTime: "",
          expireFlag: "",
        })
      );
      console.log("joinChatRoom", message, opponent);
      setMessage("");
    }
  };

  const showMessage = (message) => {
    setReceivedMessages((prevMessages) => [...prevMessages, message]);
    console.log("????", receivedMessages);
  };

  const declare = () => {
    const requestBody = {
      roomId: getRoomId,
    };

    // 상대에게 메시지 만료시켜서 보냄 (ExpireFlag : Y)
    const exitChatRoom = () => {
      if (stompClient !== null) {
        console.log("나가요!!!");
        stompClient.send(
          "/pub/chat/publish",
          {},
          JSON.stringify({
            roomId: getRoomId,
            sender: opponent,
            message: "",
            sendTime: "",
            expireFlag: "Y",
          })
        );
      } else {
        console.log("STOMP 연결이 없거나 이미 연결이 종료되었습니다.");
      }
    };

    exitChatRoom();

    // StompClient 종료시킴 (상대의 메시지 받을 수 없도록)
    const disconnect = () => {
      if (stompClient !== null) {
        setStompClient(null);
        setReceivedMessages([]);
      } else {
        console.log("STOMP 연결이 없거나 이미 연결이 종료되었습니다.");
      }
    };

    disconnect();

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
            <div className={classes.chatBubble} key={uuid()}>
              {/* eslint-disable-next-line */}
              {message.sender == opponent ? (
                <li className={classes.selfMessage}>{message.message}</li>
              ) : (
                <>
                  <div className={classes.opponentMain}>
                    {EmojiForChat !== null && (
                      <img
                        src={EmojiForChat.emoji.imageUrl}
                        alt="상대방"
                        className={classes.otherIcon}
                      />
                    )}
                    {EmojiForChat !== null ? (
                      <li className={classes.nickName}>{EmojiForChat.nickname}</li>
                    ) : (
                      <li className={classes.nickName}>상대방</li>
                    )}
                  </div>
                  <div className={classes.otherMessage}>{message.message}</div>
                </>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className={classes.sendBar}>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              joinChatRoom(); // 엔터 키를 눌렀을 때 메시지 전송
            }
          }}
        />
        <button onClick={() => joinChatRoom()} />
      </div>
    </Modal>
  );
};

export default CreateReadChat;
