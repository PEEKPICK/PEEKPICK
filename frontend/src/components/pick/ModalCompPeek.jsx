import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./ModalComp.module.css";
import { useState, useEffect, useRef } from "react";
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

  const [timeLeft, setTimeLeft] = useState(""); 
  const [finishTime, setFinishTime] = useState(null);
  const previousTimeLeft = useRef();


  // finishTime 설정
  useEffect(() => {
    if (isSelectedEmoji) { 
      const koreaTime = new Date(isSelectedEmoji.peekDetailDto.finishTime);
      koreaTime.setHours(koreaTime.getHours() + 9); // UTC + 9시간 = 한국 시간
      setFinishTime(koreaTime);
      setTimeLeft(''); // 초기 상태 설정 
    }
  }, [isSelectedEmoji]);

  // 타이머 설정
  useEffect(() => {
    if (finishTime) {
      if (previousTimeLeft.current) { 
        setTimeLeft('');
      }
  
      const calculateTimeLeft = () => {
        const now = new Date(); 
        const difference = finishTime - now;
        console.log(now)
        console.log(finishTime)
  
        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          previousTimeLeft.current = `${hours}h ${minutes}m ${seconds}s`;
          setTimeLeft(previousTimeLeft.current);
        } else {
          setTimeLeft("Time's up!");
          clearInterval(timer);
        }
      };
    
      const timer = setInterval(calculateTimeLeft, 1000);
  
      return () => clearInterval(timer);
    }
  }, [finishTime]);
  


  

  

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
    setProcessBar((likeCount / (likeCount + disLikeCount)) * 100);
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
              <span style={{ marginRight: "0.2rem" }}>PICK</span>
              <span style={{ color: "#7d00ff", fontWeight: "700" }}>10</span>
              <span style={{ marginLeft: "0.2rem" }}>회</span>
              {/* 한줄소개 넣어야함 */}
              {isSelectedEmoji.peekAvatarDto.bio &&
                isSelectedEmoji.peekAvatarDto.bio.trim() !== "" ? (
                <p className={classes.intro}>{isSelectedEmoji.peekAvatarDto.bio}</p>
              ) : (
                <p className={classes.intro}>내용이 없습니다.</p>
              )}
              <span className={classes.timer}>{timeLeft}</span>
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
              <span>{likeCount}</span>
            </div>
            <div className={classes.likes}>
              {
                checkh
                  ?
                  <img src="img/DisLike_On.png" alt="따봉색깔찬녀석" onClick={hateCancleTouch} />
                  :
                  <img src="img/DisLike_Off.png" alt="우우" onClick={hateTouch} />
              }
              <span>{disLikeCount}</span>
            </div>

          </div>
          <div className={classes.progressdiv}>
            {
              likeCount || disLikeCount
                ?
                <progress value={processBar} min="0" max="100" className={classes.progress}>{processBar}%</progress>
                :
                <span>아직 아무도 좋아요 싫어요를 하지 않았어요!</span>
            }
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalComp;
