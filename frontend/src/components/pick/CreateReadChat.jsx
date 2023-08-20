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
  const createTime = useSelector((state) => state.roomId.createTime);

  const [stompClient, setStompClient] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [showExitConfirmationModal, setShowExitConfirmationModal] = useState(false);
  const [singo, setSingo] = useState(false);
  const [isUserModal, setIsUserModal] = useState(false);
  //최하단
  const chatListRef = useRef(null);
  // 입력창의 메시지 상태와 전송된 메시지 상태 분리
  const [inputMessage, setInputMessage] = useState("");
  // -------------------------------

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
    setSingo(false);
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
          // console.log("니가 보낸거!!!!!!!!!!!!", parseMessage);
          if (parseMessage.expireFlag === "Y") {
            showMessage(parseMessage);
            dispatch(chatActions.updateEndTime(createTime));
            // dispatch(chatActions.resetState());
            if (stompClient !== null) {
              setStompClient(null);
            }
          } else {
            showMessage(parseMessage);
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
    if (stompClient && getRoomId !== null && inputMessage.trim() !== "") {
      stompClient.send(
        "/pub/chat/publish",
        {},
        JSON.stringify({
          roomId: getRoomId,
          sender: opponent,
          message: inputMessage,
          sendTime: "",
          expireFlag: "",
        })
      );
      setInputMessage("");
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
        // console.log("나가요!!!");
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
        // console.log("요청 성공:", "나가기 성공");
        dispatch(chatActions.callRoomID(""));
      })
      .catch(() => {
        // console.error("요청 실패:", "나가기 실패");
      });
    dispatch(chatActions.updateOpponentNickName());
  };

  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sirenHandler = () => {
    setSingo(true);
  };

  const sirenChat = () => {
    toast("신고가 완료됐습니다! 🚨", {
      icon: "🚨",
    });
    declare();
    closeExitConfirmationModal();
  };

  const checkUserProfile = () => {
    // EmojiForChat안에 상대 유저 정보가 다 들어있다!!!
    setIsUserModal(true);
  };

  const closeCheckUserProfile = () => {
    setIsUserModal(false);
  };

  // 스크롤을 부드럽게 최하단으로 내리는 함수
  const scrollToBottom = () => {
    if (chatListRef.current) {
      const scrollContainer = chatListRef.current;
      const targetScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const currentScroll = scrollContainer.scrollTop;

      // 스크롤 애니메이션에 사용할 프레임 수와 간격 설정
      const frames = 15; // 애니메이션 프레임 수

      const step = (targetScroll - currentScroll) / frames;
      let count = 0;

      const animateScroll = () => {
        if (count < frames) {
          count++;
          scrollContainer.scrollTop += step;
          requestAnimationFrame(animateScroll);
        }
      };

      animateScroll();
    }
  };

  useEffect(() => {
    // 메시지가 갱신될 때마다 스크롤을 최하단으로 이동
    scrollToBottom();
  }, [receivedMessages]);

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
        <div
          className={classes.chat}
          ref={chatListRef}
          // onScroll={handleScroll}
          // style={{ overflowY: "auto", maxHeight: "81%", minHeight: "78%" }}
        >
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
                        <img
                          src={EmojiForChat.emoji.imageUrl}
                          alt="상대방"
                          className={classes.otherIcon}
                          onClick={() => checkUserProfile()}
                        />
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
          </ul>
        </div>
        <div className={classes.sendBar}>
          <input
            disabled={showExitConfirmationModal}
            className={classes.inputBox}
            type="text"
            id="message"
            value={inputMessage}
            onChange={handleInputMessageChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!inputMessage.trim()) {
                  toast.error("입력하세요", {
                    id: "textareaIsEmpty",
                  });
                } else {
                  joinChatRoom();
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
              if (!inputMessage.trim()) {
                toast.error("입력하세요", {
                  id: "textareaIsEmpty",
                });
              } else {
                joinChatRoom();
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
        {isUserModal && (
          <Modal
            isOpen={isUserModal}
            onRequestClose={() => closeCheckUserProfile()} // 모달 바깥을 클릭하거나 ESC 키를 누르면 모달을 닫음
            contentLabel="Selected Emoji Modal"
            className={classes.modalMain}
          >
            {/* 모달 내용에 선택된 avatarId를 표시 */}
            <div className={classes.modalHead}>
              <img src={EmojiForChat.emoji.animatedImageUrl} alt="프로필" className={classes.profileImg} />
              <div className={classes.modalHeadText}>
                <span className={classes.nickname}>
                  {EmojiForChat.prefix.content} {EmojiForChat.nickname}
                </span>
                <div>
                  <span style={{ marginRight: "0.2rem" }}>PICK</span>
                  <span style={{ color: "#7d00ff", fontWeight: "700" }}>{EmojiForChat.chatCount}</span>
                  <span style={{ marginLeft: "0.2rem" }} className={classes.pickItem}>
                    회
                  </span>
                  <img src="img/goodFill.png" alt="goodFill" className={classes.goodImg} />
                  <span style={{ color: "#7d00ff", fontWeight: "700" }}>{EmojiForChat.likeCount}</span>
                  <span style={{ marginLeft: "0.2rem" }}>회</span>
                </div>
                {EmojiForChat.bio && EmojiForChat.bio.trim() !== "" ? (
                  <p className={classes.intro}>{EmojiForChat.bio}</p>
                ) : (
                  <p className={classes.intro}>내용이 없습니다.</p>
                )}
              </div>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.modalBody}>
              <div className={classes.likeWrap}>
                <p className={classes.like}>좋아해요</p>
                <p className={classes.itemWrap}>
                  {EmojiForChat.likes.map((like, index) => (
                    <div key={index} className={classes.items}>
                      #{like.middle}
                    </div>
                  ))}
                </p>
              </div>
              <div>
                <p className={classes.disLike}>싫어해요</p>
                <p className={classes.itemWrap}>
                  {EmojiForChat.disLikes.map((disLikes, index) => (
                    <span key={index} className={classes.items}>
                      #{disLikes.middle}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </Modal>
    </>
  );
};

export default CreateReadChat;
