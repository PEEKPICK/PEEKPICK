import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./ModalComp.module.css";

const ModalComp = () => {
  //유져 정보 모달용
  const dispatch = useDispatch();
  const isModalState = useSelector((state) => state.modal.isOpen);
  const isSelectedEmoji = useSelector((state) => state.modal.selectedEmoji);
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
            <img
              src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Heart+Exclamation.png"
              alt="프로필"
              className={classes.profileImg}
            />
            <div className={classes.modalHeadText}>
              <span className={classes.nickname}>
                {/* {isSelectedEmoji.prefix.content} {isSelectedEmoji.nickname} */}
                프론트가 좋아요
              </span>
              <span style={{ marginRight: "0.2rem" }}>PICK</span>
              <span style={{ color: "#7d00ff", fontWeight: "700" }}>10</span>
              <span style={{ marginLeft: "0.2rem" }}>회</span>
              {/* 한줄소개 넣어야함 */}
              <p className={classes.intro}>지각률 66.6% 보장</p>
            </div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.modalBody}>
            {/* get으로 id조회해서 글 가져오기 */}
            <p>10기야 삼겹살 볶음밥 맛나더라</p>
          </div>
          <button className={classes.pick}>PICK</button>
        </Modal>
      )}
    </>
  );
};

export default ModalComp;
