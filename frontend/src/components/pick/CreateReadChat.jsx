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
import ChatRestTime from "./ChatRestTime";

const CreateReadChat = ({ isModalState }) => {
  const dispatch = useDispatch();
  const newModalState = useSelector((state) => state.roomId.chatModalState);
  const getRoomId = useSelector((state) => state.roomId.roomId);
  const EmojiForChat = useSelector((state) => state.roomId.opponentURL);
  const opponent = useSelector((state) => state.roomId.opponent);
  const getNickName = useSelector((state) => state.roomId.nickName);
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [showExitConfirmationModal, setShowExitConfirmationModal] = useState(false);
  const scrollRef = useRef();

  const chatPop = () => {
    dispatch(chatActions.updateChatModalState(!isModalState));
  };

  const handleCloseModal = () => {
    if (!showExitConfirmationModal) {
      dispatch(chatActions.updateChatModalState(!isModalState));
    }
  };

  const handleExitConfirmation = () => {
    setShowExitConfirmationModal(true);
  };

  const closeExitConfirmationModal = () => {
    setShowExitConfirmationModal(false);
  };

  const exitChat = () => {
    declare();
    closeExitConfirmationModal();
  };

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS(`https://peekpick.online/ws`);
      const factory = Stomp.over(socket);
      factory.reconnect_delay = 2000;

      factory.connect({}, (frame) => {
        setStompClient(factory);
        factory.subscribe(`/sub/chat/room/${getRoomId}`, (chatMessage) => {
          const parseMessage = JSON.parse(chatMessage.body);
          console.log("니가 보낸거!!!!!!!!!!!!", parseMessage);
          if (parseMessage.expireFlag === "Y") {
            showMessage(parseMessage);
            scrollToBottom();
            if (stompClient !== null) {
              setStompClient(null);
            }
          } else {
            showMessage(parseMessage);
            scrollToBottom();
          }
        });
      });
    };
    connect();
    // eslint-disable-next-line
  }, [getRoomId]);

  useEffect(() => {
    setReceivedMessages([]);
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
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const showMessage = (message) => {
    setReceivedMessages((prevMessages) => [...prevMessages, message]);
  };

  const declare = () => {
    dispatch(chatActions.updateChatModalState(!isModalState));
    const requestBody = {
      roomId: getRoomId,
    };

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
      }
    };

    exitChatRoom();

    const disconnect = () => {
      if (stompClient !== null) {
        setStompClient(null);
        setReceivedMessages([]);
      }
    };

    disconnect();

    customAxios
      .post("/picker/chat-end", requestBody)
      .then(() => {
        console.log("요청 성공:", "나가기 성공");
        dispatch(chatActions.callRoomID(""));
      })
      .catch(() => {
        console.error("요청 실패:", "나가기 실패");
      });
    dispatch(chatActions.updateOpponentNickName());
  };

  const handleInputMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sirenHandler = () => {
    toast("신고가 완료됐습니다! 🚨", {
      icon: "🚨",
    });
    handleExitConfirmation();
  };

  return (
    <>
      <Modal
        isOpen={newModalState}
        onRequestClose={() => handleCloseModal()}
        contentLabel="Selected Emoji Modal"
        className={classes.chatMain}
        id="chatMain"
      >
        <div className={classes.chatHeader}>
          <button
            onClick={() => handleExitConfirmation()}
            className={classes.cancel}
            disabled={showExitConfirmationModal}
          >
            <img src="img/cancel.png" alt="나가기" />
          </button>
          {/* <div className={classes.time}>{typeof timeLeft === "string" ? timeLeft : formatTime(timeLeft)}</div> */}
          {/* <p>Rest Time: {restTime}</p> */}
          <ChatRestTime />
          <div className={classes.headerRight}>
            <button className={classes.siren} disabled={showExitConfirmationModal}>
              <img src="img/siren.png" alt="신고" onClick={() => sirenHandler()} />
            </button>
            <button onClick={() => chatPop()} className={classes.downBtn} disabled={showExitConfirmationModal}>
              <img src="img/down.png" alt="내리기" />
            </button>
          </div>
        </div>
        <div className={classes.divider} />{" "}
        <div className={classes.chat}>
          <ul id="messageList">
            {receivedMessages.map((message) => (
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
            <div id="box" className={classes.box} ref={scrollRef} />
          </ul>
        </div>
        <div className={classes.sendBar}>
          <input
            disabled={showExitConfirmationModal}
            className={classes.inputBox}
            type="text"
            id="message"
            value={message}
            onChange={handleInputMessageChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!message.trim()) {
                  toast.error("입력하세요", {
                    id: "textareaIsEmpty",
                  });
                } else {
                  joinChatRoom();
                  scrollToBottom(); // 메시지를 전송하고 나서 스크롤 아래로 이동
                }
                if (stompClient === null) {
                  toast.error("대화 상대가 없습니다.", {
                    id: "notCommunity",
                  });
                }
              }
            }}
          />
          <button
            disabled={showExitConfirmationModal}
            onClick={() => {
              if (!message.trim()) {
                toast.error("입력하세요", {
                  id: "textareaIsEmpty",
                });
              } else {
                joinChatRoom();
                scrollToBottom(); // 메시지를 전송하고 나서 스크롤 아래로 이동
              }
              if (stompClient === null) {
                toast.error("대화 상대가 없습니다.", {
                  id: "notCommunity",
                });
              }
            }}
          />
        </div>
        {showExitConfirmationModal && (
          <div className={classes.exitConfirmationModal}>
            <div className={classes.caution}>CAUTION</div>

            <div className={classes.modal_divider}></div>

            <p>정말로 나가시겠습니까?</p>
            <p>모든 대화의 내용이 삭제됩니다.</p>

            <div className={classes.button_area}>
              <button onClick={() => exitChat()} className={classes.exit_button}>
                나가기
              </button>
              <button onClick={() => closeExitConfirmationModal()} className={classes.cancel_button}>
                취소
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CreateReadChat;
