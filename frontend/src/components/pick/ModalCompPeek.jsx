import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./ModalComp.module.css";
import { useState, useEffect } from "react";
import { customAxios } from "../../api/customAxios";



const ModalComp = () => {
  //유져 정보 모달용
  const dispatch = useDispatch();
  const isModalState = useSelector((state) => state.modal.isOpen);
  const isSelectedEmoji = useSelector((state) => state.modal.selectedEmoji);





  // 이 함수들은 좋아요, 싫어요 버튼을 클릭했을 때, 바로 반응되도록 만들어짐
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [processBar, setProcessBar] = useState(0);
  const [checkl, setCheckl] = useState(false);
  const [checkh, setCheckh] = useState(false);
 
  const [finishTime, setFinishTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // 초기값은 0으로 설정
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours}h ${minutes}m ${sec}s`;
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
    setProcessBar(Math.floor((likeCount / (likeCount + disLikeCount)) * 100));
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
      })
      .catch((res) => { });
  };

  const likeCancleTouch = () => {
    customAxios
      .post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { like: true })
      .then((res) => {
        setLikeCount(likeCount - 1);
        setCheckl(!checkl);
      })
      .catch((res) => { });
  };
  const hateTouch = () => {
    customAxios
      .post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { like: false })
      .then((res) => {
        setDisLikeCount(disLikeCount + 1);
        setCheckh(!checkh);
      });
  };
  const hateCancleTouch = () => {
    customAxios
      .post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { like: false })
      .then((res) => {
        setDisLikeCount(disLikeCount - 1);
        setCheckh(!checkh);
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
              src={isSelectedEmoji.peekAvatarDto.emoji.imageUrl}
              alt="프로필"
              className={classes.profileImg}
            />
            <div className={classes.modalHeadText}>
              <span className={classes.nickname}>
                {isSelectedEmoji.peekAvatarDto.prefix.content}{" "}
                {isSelectedEmoji.peekAvatarDto.nickname}
              </span>
              {/* <span style={{ marginRight: "0.2rem" }}>PICK</span>
              <span style={{ color: "#7d00ff", fontWeight: "700" }}>10</span>
              <span style={{ marginLeft: "0.2rem" }}>회</span> */}
              {/* 한줄소개 넣어야함 */}
  
              <p className={classes.intro}>            
                  <span className={classes.timer} style={{ marginRight: '20px' }}>
                      <img src="img/timer.png" alt="Peek timer" className="timer-img" />
                      {typeof timeLeft === "number" ? formatTime(timeLeft) : timeLeft}
                  </span>

                  <span className={classes.distance}>
                      <img src="img/peek_distance.png" alt="Peek distance" className="distance-img" />
                      {isSelectedEmoji.peekDetailDto.distance} m 
                  </span>
              </p>

          
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
                <p>{isSelectedEmoji.peekDetailDto.content}</p>
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
                  <img src="img/Like_On.png" alt="따봉색깔찬녀석" onClick={likeCancleTouch} />
                  :
                  <img src="img/Like_Off.png" alt="따봉" onClick={likeTouch} />
              }

            </div>
            <div className={classes.likes}>
              {
                checkh
                  ?
                  <img src="img/DisLike_On.png" alt="따봉색깔찬녀석" onClick={hateCancleTouch} />
                  :
                  <img src="img/DisLike_Off.png" alt="우우" onClick={hateTouch} />
              }

            </div>

          </div>
          <div className={classes.progressdiv}>
            {
              likeCount || disLikeCount
                ?
                <div className={classes.bottomvalue}>
                  <span>{processBar}%</span>
                  <progress value={processBar} min="0" max="100" className={classes.progress}></progress>
                  <span>{100 - processBar}% </span>
                </div>
                :
                <span></span>
            }
          </div>

        </Modal>
      )}
    </>
  );
};

export default ModalComp;