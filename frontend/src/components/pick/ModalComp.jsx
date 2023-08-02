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
          onRequestClose={handleCloseModal} // 모달 바깥을 클릭하거나 ESC 키를 누르면 모달을 닫음
          contentLabel="Selected Emoji Modal"
          className={classes.modalMain}
        >
          <div>
            <img src="./img/cancel.png" alt="??" onClick={handleCloseModal} className={classes.closeBtn} />
          </div>
          {/* 모달 내용에 선택된 avatarId를 표시 */}
          <img src={isSelectedEmoji.emoji.imageUrl} alt="프로필" className={classes.profileImg} />
          <p>avatarId: {isSelectedEmoji.avatarId}</p>
          <p>
            nickname: {isSelectedEmoji.prefix.content} {isSelectedEmoji.nickname}
          </p>
          <p>
            Likes:{" "}
            {isSelectedEmoji.likes.map((like, index) => (
              <span key={index}>{like} </span>
            ))}
          </p>
          <p>
            disLikes:{" "}
            {isSelectedEmoji.disLikes.map((disLikes, index) => (
              <span key={index}>{disLikes} </span>
            ))}
          </p>
          <p>Selected: {isSelectedEmoji.avatarId}</p>
          <p>Selected: {isSelectedEmoji.avatarId}</p>
        </Modal>
      )}
    </>
  );
};

export default ModalComp;
