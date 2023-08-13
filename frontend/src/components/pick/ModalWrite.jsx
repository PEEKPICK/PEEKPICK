import React, { useState } from "react";
import { customAxios } from "../../api/customAxios";
import classes from './ModalWrite.module.css';
import Modal from "react-modal";
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import { modalsActions } from "../../store/modalsSlice";

const ModalWrite = ({ emojiCall }) => {
  const isModalState = useSelector((state) => state.modals.isOpen);
  const userPos = useSelector((state) => state.location.userPos);
  const dispatch = useDispatch();
  const [writeData, setWriteData] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 추가된 부분

  const handleWrite = (e) => {
    setWriteData(e.target.value);
  };

  const handleCloseModal = () => {
    setWriteData("");
    dispatch(modalsActions.closeModal())
  };

  const postWrite = () => {
    if (!writeData.trim()) {
      toast.error("내용을 입력하세요", {
        id: 'textareaIsEmpty'
      });
      return;
    }

    setIsButtonDisabled(true);  // 버튼을 비활성화

    let f = new FormData();
    f.append("content", writeData);
    f.append("longitude", userPos.point.x);
    f.append("latitude", userPos.point.y);

    setTimeout(() => {
      customAxios.post("/peek/write", f)
        .then((response) => {
          dispatch(modalsActions.closeModal())
          toast.success("PEEK 입력 완료");
          setWriteData("");
          emojiCall();
          setTimeout(() => {
            setIsButtonDisabled(false); // 3초 후 버튼을 다시 활성화
          }, 3000);
        })
        .catch((response) => {
          setWriteData("");
          console.log(response);
          toast.error("ERROR");
          dispatch(modalsActions.closeModal())
          setTimeout(() => {
            setIsButtonDisabled(false); // 3초 후 버튼을 다시 활성화
          }, 3000);
        })
    }, 2000);
  };

  return (
    <>
      <Modal
        isOpen={isModalState}
        onRequestClose={() => handleCloseModal()}
        className={classes.modalMain}
      >
        <div className={classes.top}>
          <span>피크 남기기</span>
          <img src="img/cancel.png" alt="" onClick={handleCloseModal} />
        </div>
        <hr className={classes.hr} />
        <div className={classes.content}>
          <textarea onChange={handleWrite} className={classes.text}></textarea>
        </div>
        <div className={classes.imgthrow}>
          <button className={classes.button} onClick={postWrite} disabled={isButtonDisabled}>입력 완료</button> {/* 수정된 부분 */}
        </div>
      </Modal>
    </>
  );
}

export default ModalWrite;
