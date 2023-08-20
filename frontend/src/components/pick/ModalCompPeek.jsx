import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./ModalComp.module.css";
import { useState, useEffect } from "react";
import { customAxios } from "../../api/customAxios";
import { toast } from "react-hot-toast";

const ModalComp = () => {
  //유져 정보 모달용
  const dispatch = useDispatch();
  const isModalState = useSelector((state) => state.modal.isOpen);
  const isSelectedEmoji = useSelector((state) => state.modal.selectedEmoji);

  // console.log(isSelectedEmoji);

  // 이 함수들은 좋아요, 싫어요 버튼을 클릭했을 때, 바로 반응되도록 만들어짐
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [processBar, setProcessBar] = useState(0);
  const [checkl, setCheckl] = useState(false);
  const [checkh, setCheckh] = useState(false);

  const [finishTime, setFinishTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // 초기값은 0으로 설정


  const [showExitConfirmationModal, setShowExitConfirmationModal] = useState(false);
  const [singo, setSingo] = useState(false);

  // const handleExitConfirmation = () => {
  //   setShowExitConfirmationModal(true);
  // };

  const closeExitConfirmationModal = () => {
    setShowExitConfirmationModal(false);
    setSingo(false);
  };

  const sirenHandler = () => {
    setSingo(true);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = sec < 10 ? `0${sec}` : sec;

    return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
  };

  useEffect(() => {
    if (isSelectedEmoji) {
      const koreaTime = new Date(isSelectedEmoji.peekDetailDto.finishTime);
      koreaTime.setHours(koreaTime.getHours() + 9); // UTC + 9시간 = 한국 시간
      setFinishTime(koreaTime);
    }
  }, [isSelectedEmoji]);

  useEffect(() => {
    if (finishTime) {
      const now = new Date();
      const difference = finishTime - now;
      const secondsLeft = Math.floor(difference / 1000);
      setTimeLeft(secondsLeft);
    }
  }, [finishTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId); // 컴포넌트 unmount 시 타이머 제거
    }
    else if (timeLeft === 0) {
      setTimeLeft("Time's up!");
    }
  }, [timeLeft]);

  useEffect(() => {
    if (isSelectedEmoji) {
      // isSelectedEmoji가 null이 아닐 때만 업데이트
      setLikeCount(isSelectedEmoji.peekDetailDto.likeCount);
      setDisLikeCount(isSelectedEmoji.peekDetailDto.disLikeCount);
      setCheckl(isSelectedEmoji.peekDetailDto.liked);
      setCheckh(isSelectedEmoji.peekDetailDto.disLiked);
    }
  }, [isSelectedEmoji]);

  // 퍼센트 창이 바로 반응하도록, 마운트 추가
  useEffect(() => {
    if (likeCount + disLikeCount > 0) {
      setProcessBar(Math.floor((likeCount / (likeCount + disLikeCount)) * 100));
    } else {
      setProcessBar(0);
    }
  }, [likeCount, disLikeCount]);

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  const likeTouch = () => {
    customAxios
      .post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { like: true })
      .then((res) => {
        setLikeCount(likeCount + 1);
        setCheckl(!checkl);
        setTimeLeft(timeLeft+600);
      })
      .catch((res) => { });
  };

  const likeCancleTouch = () => {
    customAxios
      .post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { like: true })
      .then((res) => {
        setLikeCount(likeCount - 1);
        setCheckl(!checkl);
        setTimeLeft(timeLeft-600);
      })
      .catch((res) => { });
  };

  const hateTouch = () => {
    customAxios
      .post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { like: false })
      .then((res) => {
        setDisLikeCount(disLikeCount + 1);
        setCheckh(!checkh);
        setTimeLeft(timeLeft+600);
      });
  };

  const hateCancleTouch = () => {
    customAxios
      .post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { like: false })
      .then((res) => {
        setDisLikeCount(disLikeCount - 1);
        setCheckh(!checkh);
        setTimeLeft(timeLeft-600);
      });
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
  // 시간 제한
  const handleButtonClick = (clickHandler) => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true); // 클릭 비활성화
      clickHandler();

      setTimeout(() => {
        setIsButtonDisabled(false); // 2초 후에 클릭 활성화
      }, 1000);
    }
  };

  const sirenPeek = () => {
    const requestReportDto = {
      "reportCategoryId" : 6,
      "reportContent" : "신고 내용 텍스트"
    };
    customAxios
    .post(`/report/peek/${isSelectedEmoji.peekDetailDto.peekId}`, requestReportDto) 
    .then((res) => {
      // 성공 시 처리
      toast("신고가 완료됐습니다! 🚨", {
        icon: "🚨",
      });
      handleCloseModal();
      closeExitConfirmationModal();
    })
    .catch((res) => { 
      // 실패 시 처리
      toast("신고에 실패했습니다. 😞", {
        icon: "😞",
      });
    });
  };
  
  return (
    <>
      {isModalState && isSelectedEmoji && (
        <Modal
          isOpen={isModalState}
          onRequestClose={() => handleCloseModal()} // 모달 바깥을 클릭하거나 ESC 키를 누르면 모달을 닫음
          contentLabel="Selected Emoji Modal"
          className={classes.modalMain}
        >
          {/* 모달 내용에 선택된 avatarId를 표시 */}
          <div className={classes.modalHead}>
            <img
              src={isSelectedEmoji.peekAvatarDto.writerId === 1 ? "https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Wrapped+Gift.png" : isSelectedEmoji.peekAvatarDto.emoji.imageUrl}
              alt="프로필"
              className={classes.profileImg}
            />
            
            <div className={classes.modalHeadText}>
              <div className={classes.nicknameAndSiren}>
                <div className={classes.nickname}>
                  <span>
                    {isSelectedEmoji.peekAvatarDto.writerId === 1 ? "PEEKPICK" : isSelectedEmoji.peekAvatarDto.prefix.content}{" "}
                    {isSelectedEmoji.peekAvatarDto.writerId === 1 ? "관리자" : isSelectedEmoji.peekAvatarDto.nickname}
                  </span>
                </div>
   
                {
                  // nowUserId와 writerId가 다른 경우에만 siren 버튼을 보여줌
                  (isSelectedEmoji.nowUserId !== isSelectedEmoji.peekAvatarDto.writerId) &&
                  <button className={classes.siren} disabled={showExitConfirmationModal}>
                    <img src="img/siren.png" alt="신고" onClick={() => sirenHandler()} />
                  </button>
                }
              </div>
              {/* <span style={{ marginRight: "0.2rem" }}>PICK</span>
              <span style={{ color: "#7d00ff", fontWeight: "700" }}>10</span>
              <span style={{ marginLeft: "0.2rem" }}>회</span> */}
              {/* 한줄소개 넣어야함 */}

              <div className={classes.intro} style={{ backgroundColor: "#ffffff", marginTop: "-5px" }}>
                <span className={classes.timer} style={{ marginLeft: '-10px', fontWeight: 700, width: "120px" }}>
                  <img src="img/hourglass.png" alt="모래시계" />
                  {typeof timeLeft === "number" ? formatTime(timeLeft) : timeLeft}
                </span>

                <span className={classes.distance} style={{ fontWeight: 700 }}>
                  <img src="img/placeholder.png" alt="" />
                  {isSelectedEmoji.peekDetailDto.distance} m
                </span>
              </div>


            </div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.modalbodys}>
            {
              isSelectedEmoji.peekDetailDto.imageUrl
              &&
              <div className={classes.peekImg}>
                <img src={isSelectedEmoji.peekDetailDto.imageUrl} alt="" />
              </div>
            }
            {/* get으로 id조회해서 글 가져오기 */}
            <div className={classes.modalBodyPeek}>
              {isSelectedEmoji.peekDetailDto.content &&
                isSelectedEmoji.peekDetailDto.content.trim() !== "" ? (
                <p className={classes.viewContent}>{isSelectedEmoji.peekDetailDto.content}</p>
              ) : (
                <p>내용이 없습니다.</p>
              )}
            </div>
          </div>

          <div className={classes.likeDisLike}>
            <div className={classes.likes} >
              {
                checkl
                  ?
                  <img src="img/Like_On.png" alt="따봉색깔찬녀석" onClick={() => handleButtonClick(likeCancleTouch)} />
                  :
                  <img src="img/Like_Off.png" alt="따봉" onClick={() => handleButtonClick(likeTouch)} />
              }
              {likeCount || disLikeCount ?
                <span>{processBar}%</span>
                :
                <span></span>
              }
            </div>
            <div className={classes.vs}>
              <img src="img/VS.png" alt="" className={classes.VS} />
            </div>
            <div className={classes.hates}>
              {likeCount || disLikeCount ?
                <span>{100 - processBar}%</span>
                :
                <span></span>
              }
              {
                checkh
                  ?
                  <img src="img/DisLike_On.png" alt="따봉색깔찬녀석" onClick={() => handleButtonClick(hateCancleTouch)} />
                  :
                  <img src="img/DisLike_Off.png" alt="우우" onClick={() => handleButtonClick(hateTouch)} />
              }
            </div>
          </div>
          <div className={classes.progressdiv}>
            {
              likeCount || disLikeCount
                ?
                <div className={classes.bottomvalue}>
                  {/* <span>{processBar}</span> */}
                  <progress value={processBar} min="0" max="100" className={classes.progress}></progress>
                  {/* <span>{100 - processBar} </span> */}
                </div>
                :
                <span></span>
            }
          </div>
          {singo && (
            <div className={classes.exitConfirmationModal}>
              <div className={classes.caution}>CAUTION</div>

              <div className={classes.modal_divider}></div>

              <p>Peek를 신고하시겠습니까?</p> 

              <div className={classes.button_area}>
                <button onClick={() => sirenPeek()} className={classes.exit_button} >
                  신고하기
                </button>
                <button onClick={() => closeExitConfirmationModal()} className={classes.cancel_button}>
                  취소
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default ModalComp;