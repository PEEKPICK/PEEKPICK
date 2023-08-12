import Modal from "react-modal";
import classes from "./CreateReadChat.module.css";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../store/chatSlice";
import React, { useEffect, useState, useRef } from "react";
import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { customAxios } from "../../api/customAxios";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";

const CreateReadChat = ({ isModalState }) => {
  const dispatch = useDispatch();
  const newModalState = useSelector((state) => state.roomId.chatModalState);
  const getRoomId = useSelector((state) => state.roomId.roomId);
  // const createTime = useSelector((state) => state.roomId.createTime);
  const EmojiForChat = useSelector((state) => state.roomId.opponentURL);
  const opponent = useSelector((state) => state.roomId.opponent);
  const getNickName = useSelector((state) => state.roomId.nickName);
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  //채팅 내리기
  const messagesEndRef = useRef(null);
  //나가기
  // const [showExitConfirmationModal, setShowExitConfirmationModal] = useState(false);
  useEffect(() => {
    // setShowExitConfirmationModal(false);
  }, []);
  // 채팅 시간
  const [timeLeft, setTimeLeft] = useState(0);
  const createTime = useSelector((state) => state.roomId.createTime);
  const endTime = useSelector((state) => state.roomId.endTime);

  const chatPop = () => {
    console.log("getRoomId", getRoomId);
    console.log("opponent", opponent);
    console.log("EmojiForChat", EmojiForChat);
    dispatch(chatActions.updateChatModalState(!isModalState));
  };

  const handleCloseModal = () => {
    dispatch(chatActions.updateChatModalState(!isModalState));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec}`;
  };

  useEffect(() => {
    console.log(createTime);
    console.log();
    if (createTime && endTime) {
      const koreaTime = new Date(endTime);
      koreaTime.setHours(koreaTime.getHours() + 9);
      setTimeLeft((koreaTime - new Date()) / 1000);
    }
  }, [createTime, endTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setTimeLeft("Time's up!");
    }
  }, [timeLeft]);

  // useEffect(() => {
  //   if (getRoomId !== null) {
  //     setNickName(EmojiForChat.nickName);
  //   } else {
  //     setNickName(null);
  //   }
  // }, [getRoomId, EmojiForChat]);

  // const handleExitConfirmation = () => {
  // setShowExitConfirmationModal(true); // 모달을 열기 위해 상태를 업데이트
  // };

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(`https://i9b309.p.ssafy.io/ws`);
      const factory = Stomp.over(socket); // Create a factory
      factory.reconnect_delay = 2000; // Set reconnect delay if needed

      factory.connect({}, (frame) => {
        setStompClient(factory); // Use the factory as StompClient
        factory.subscribe(`/sub/chat/room/${getRoomId}`, (chatMessage) => {
          const parseMessage = JSON.parse(chatMessage.body);
          console.log("니가 보낸거!!!!!!!!!!!!", parseMessage);
          // if (parseMessage.expireFlag === "Y") {
          //   try {
          //     showMessage(parseMessage);
          //     customAxios
          //       .post("/picker/chat-end", getRoomId)
          //       .then(() => {
          //         console.log("요청 성공:", "나가기 성공");
          //         // 요청이 성공했을 때 실행할 코드 작성
          //         dispatch(chatActions.callRoomID(""));
          //       })
          //       .catch(() => {
          //         console.error("요청 실패:", "나가기 실패");
          //         // 요청이 실패했을 때 실행할 코드 작성
          //       });
          //     handleExpireMessage();
          //   } catch {
          //     return;
          //   }
          // }
          // else {
          showMessage(parseMessage);
          // }
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

  // const handleExpireMessage = () => {
  //   dispatch(chatActions.resetState());
  // };

  useEffect(() => {
    setReceivedMessages([]); // roomId가 변경될 때마다 배열 초기화
  }, [getRoomId]);

  const joinChatRoom = () => {
    if (stompClient && getRoomId !== null) {
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
      setMessage("");
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  scrollToBottom();

  const showMessage = (message) => {
    setReceivedMessages((prevMessages) => [...prevMessages, message]);
  };

  const declare = () => {
    setTimeLeft(0);
    // setShowExitConfirmationModal(false);
    dispatch(chatActions.updateChatModalState(!isModalState));
    const requestBody = {
      roomId: getRoomId,
    };

    // 상대에게 메시지 만료시켜서 보냄 (ExpireFlag : Y)
    const exitChatRoom = () => {
      if (stompClient !== null) {
        stompClient.send(
          "/pub/chat/publish",
          {},
          JSON.stringify({
            roomId: getRoomId,
            sender: "System",
            message: "상대방이 채팅방을 나갔습니다.",
            sendTime: "",
            expireFlag: "Y",
          })
        );
        console.log("나가요!!!");
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
    dispatch(chatActions.updateOpponentNickName());
  };

  return (
    <>
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
          <p className={classes.time}>{typeof timeLeft === "string" ? timeLeft : formatTime(timeLeft)}</p>
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
                        <img src={EmojiForChat.emoji.imageUrl} alt="상대방" className={classes.otherIcon} />
                      )}
                      {EmojiForChat !== null ? (
                        <li className={classes.nickName} key={uuid()}>
                          {message.sender === "System" ? "관리자" : getNickName}
                        </li>
                      ) : (
                        <li className={classes.nickName}>{message.sender === "System" ? "관리자" : "상대방"}</li>
                      )}
                    </div>

                    <div className={classes.otherMessage}>{message.message}</div>
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </div>
        <div className={classes.sendBar}>
          <input
            className={classes.inputBox}
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!message.trim()) {
                  toast.error("입력하세요", {
                    id: "textareaIsEmpty",
                  });
                } else {
                  joinChatRoom(); // 엔터 키를 눌렀을 때 메시지 전송
                }
              }
            }}
            // disabled={showExitConfirmationModal}
          />
          <button onClick={() => joinChatRoom()} />
        </div>
        {/* {showExitConfirmationModal && (
          <div className={classes.exitConfirmationModal}>
            <p>정말로 나가시겠습니까?</p>
            <button onClick={() => declare()}>나가기</button>
            <button onClick={() => setShowExitConfirmationModal(false)}>취소</button>
          </div>
        )} */}
      </Modal>
    </>
  );
};

export default CreateReadChat;
