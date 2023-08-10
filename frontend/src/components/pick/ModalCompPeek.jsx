import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./ModalComp.module.css";
import { useState, useEffect } from "react";
import { customAxios } from '../../api/customAxios'


const ModalComp = (view) => {
  //유져 정보 모달용
  const dispatch = useDispatch();
  const isModalState = useSelector((state) => state.modal.isOpen);
  const isSelectedEmoji = useSelector((state) => state.modal.selectedEmoji);
  const [likeCount, setLikeCount] = useState("");
  const [disLikeCount, setDisLikeCount] = useState("");
  const [processBar, setProcessBar] = useState(likeCount / (likeCount + disLikeCount) * 100);
  const [checkl, setCheckl] = useState(false);
  const [checkh, setCheckh] = useState(false);
  useEffect(() => {
    if (isSelectedEmoji) { // isSelectedEmoji가 null이 아닐 때만 업데이트
      setLikeCount(isSelectedEmoji.peekDetailDto.likeCount);
      setDisLikeCount(isSelectedEmoji.peekDetailDto.disLikeCount);
      setCheckl(isSelectedEmoji.peekDetailDto.liked);
      setCheckh(isSelectedEmoji.peekDetailDto.disLiked);
    }
  }, [isSelectedEmoji]);

  useEffect(() => {
    setProcessBar(likeCount / (likeCount + disLikeCount) * 100);
  }, [likeCount, disLikeCount])

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  const likeTouch = () => {
    customAxios.post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { "like": true })
      .then((res) => {
        setLikeCount(likeCount + 1);
        setCheckl(!checkl);
      })
      .catch((res) => {
      })
  }

  const likeCancleTouch = () => {
    customAxios.post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { "like": true })
      .then((res) => {
        setLikeCount(likeCount - 1);
        setCheckl(!checkl);
      })
      .catch((res) => {
      })
  }
  const hateTouch = () => {
    customAxios.post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { "like": false })
    .then((res)=>{
      setDisLikeCount(disLikeCount + 1);
      setCheckh(!checkh);
    })
  }
  const hateCancleTouch = () => {
    customAxios.post(`/peek/${isSelectedEmoji.peekDetailDto.peekId}`, { "like": false })
    .then((res)=>{
      setDisLikeCount(disLikeCount - 1);
      setCheckh(!checkh);
    })
  }
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
              src={
                view
                  ? "https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Grey+Heart.png"
                  : "https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Red+Heart.png"
              }
              alt="프로필"
              className={classes.profileImg}
            />
            <div className={classes.modalHeadText}>
              <span className={classes.nickname}>
                {isSelectedEmoji.peekAvatarDto.prefix.content} {isSelectedEmoji.peekAvatarDto.nickname}
              </span>
              <span style={{ marginRight: "0.2rem" }}>PICK</span>
              <span style={{ color: "#7d00ff", fontWeight: "700" }}>10</span>
              <span style={{ marginLeft: "0.2rem" }}>회</span>
              {/* 한줄소개 넣어야함 */}
              {isSelectedEmoji.peekAvatarDto.bio && isSelectedEmoji.peekAvatarDto.bio.trim() !== "" ? (
                <p className={classes.intro}>{isSelectedEmoji.peekAvatarDto.bio}</p>
              ) : (
                <p className={classes.intro}>내용이 없습니다.</p>
              )}
            </div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.modalbodys}>
            {/* get으로 id조회해서 글 가져오기 */}
            <div className={classes.modalBodyPeek}>

              {isSelectedEmoji.peekDetailDto.content && isSelectedEmoji.peekDetailDto.content.trim() !== "" ? (
                <p>{isSelectedEmoji.peekDetailDto.content}</p>
              ) : (
                <p>내용이 없습니다.</p>
              )}
            </div>
            <div className={classes.peekImg}>
              <img src={isSelectedEmoji.peekDetailDto.imageUrl} alt="" />
            </div>
          </div>

          <div className={classes.likeDisLike}>
            <div className={classes.likes} >
              {
                checkl
                  ?
                  <img src="" alt="따봉색깔찬녀석" onClick={likeCancleTouch} />
                  :
                  <img src="img/good.png" alt="따봉" onClick={likeTouch} />
              }
              <span>{likeCount}</span>
            </div>
            <div className={classes.likes}>
              {
                checkh
                ?
                <img src="" alt="따봉색깔찬녀석" onClick={hateCancleTouch}/>
                :
                <img src="img/bad.png" alt="우우" onClick={hateTouch}/>
              }
              <span>{disLikeCount}</span>
            </div>
            {
              likeCount || disLikeCount
                ?
                <progress value={processBar} min="0" max="100"></progress>
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
