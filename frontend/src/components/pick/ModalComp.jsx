import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./ModalComp.module.css";

const ModalComp = () => {
  const isModalState = useSelector((state) => state.modal.isOpen);
  const isSelectedEmoji = useSelector((state) => state.modal.selectedEmoji);
  const dispatch = useDispatch();

  console.log("선택이모지", isSelectedEmoji);

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
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
              <span style={{ marginRight: "0.2rem" }}>PICK</span>
              <span style={{ color: "#7d00ff", fontWeight: "700" }}>100</span>
              <span style={{ marginLeft: "0.2rem" }}>회</span>
              <p className={classes.intro}>지각률 66.6% 보장</p>
            </div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.modalBody}>
            <div>
              <p className={classes.like}>좋아!</p>
              <p>
                {isSelectedEmoji.likes.map((like, index) => (
                  <span key={index} className={classes.likeInfo}>
                    #{like}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className={classes.disLike}>싫어!</p>
              <p>
                {isSelectedEmoji.disLikes.map((disLikes, index) => (
                  <span key={index} className={classes.likeInfo}>
                    #{disLikes}{" "}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className={classes.pick}>PICK</div>
        </Modal>
      )}
    </>
  );
};

export default ModalComp;
