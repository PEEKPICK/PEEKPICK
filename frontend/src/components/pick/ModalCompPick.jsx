import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import { chatActions } from "../../store/chatSlice";
import classes from "./ModalComp.module.css";
import { customAxios } from "../../api/customAxios";
import ToastNotification from "./ToastNotification";
import { toast } from "react-toastify";

const ModalComp = () => {
  //유져 정보 모달용
  const dispatch = useDispatch();
  const isModalState = useSelector((state) => state.modal.isOpen);
  const isSelectedEmoji = useSelector((state) => state.modal.selectedEmoji);
  const [isPickButtonDisabled, setPickButtonDisabled] = useState(false); // 버튼 활성화 여부 상태 추가

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
    dispatch(chatActions.updateURL(isSelectedEmoji));
  };
  //채팅요청
  const plzChat = () => {
    if (!isPickButtonDisabled) {
      setPickButtonDisabled(true); // 버튼 비활성화
      setTimeout(() => {
        setPickButtonDisabled(false); // 일정 시간(15초) 후에 버튼 다시 활성화
      }, 15000); // 15초
    }
    customAxios.get(`/picker/chat-request/${isSelectedEmoji.avatarId}`).then((response) => {
      console.log(response.data.message);
      console.log("aaa", isSelectedEmoji);
      const nickNameSum = `${isSelectedEmoji.prefix.content} ${isSelectedEmoji.nickname}`;
      const toastContent = <ToastNotification message={`${nickNameSum}님 에게 채팅을 요청했습니다.`} />;
      toast(toastContent, {
        position: "top-right",
        closeOnClick: true,
        draggable: false,
        autoClose: 1650,
        className: "toast-message",
        hideProgressBar: true,
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
            <img src={isSelectedEmoji.emoji.animatedImageUrl} alt="프로필" className={classes.profileImg} />
            <div className={classes.modalHeadText}>
              <span className={classes.nickname}>
                {isSelectedEmoji.prefix.content} {isSelectedEmoji.nickname}
              </span>
              <div>
                <span style={{ marginRight: "0.2rem" }}>PICK</span>
                <span style={{ color: "#7d00ff", fontWeight: "700" }}>{isSelectedEmoji.chatCount}</span>
                <span style={{ marginLeft: "0.2rem" }} className={classes.pickItem}>회</span>
                {/* <span style={{ marginRight: "0.2rem" }}>따봉</span> */}
                <img src="img/goodFill.png" alt="goodFill" className={classes.goodImg} />
                <span style={{ color: "#7d00ff", fontWeight: "700" }}>{isSelectedEmoji.likeCount}</span>
                <span style={{ marginLeft: "0.2rem" }}>회</span>
              </div>
              {isSelectedEmoji.bio && isSelectedEmoji.bio.trim() !== "" ? (
                <p className={classes.intro}>{isSelectedEmoji.bio}</p>
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
                {isSelectedEmoji.likes.map((like, index) => (
                  <div key={index} className={classes.items}>
                    #{like.middle}
                  </div>
                ))}
              </p>
            </div>
            <div>
              <p className={classes.disLike}>싫어해요</p>
              <p className={classes.itemWrap}>
                {isSelectedEmoji.disLikes.map((disLikes, index) => (
                  <span key={index} className={classes.items}>
                    #{disLikes.middle}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className={classes.pickWrap}>
            {isPickButtonDisabled ? (
              <div className={classes.pickwaiting}>
                <div className={classes.waiting}> </div>
              </div>
            ) : (
              <button className={classes.pick} onClick={plzChat} disabled={isPickButtonDisabled}>
                PICK
              </button>
            )}
          </div>
        </Modal>
      )}
      <ToastNotification />
    </>
  );
};

export default ModalComp;
