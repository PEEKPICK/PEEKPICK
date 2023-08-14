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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);  
  const [currentLength, setCurrentLength] = useState(0);

  const handleWrite = (e) => {
    setWriteData(e.target.value);
    setCurrentLength(e.target.value.length);
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


    customAxios.post("/peek/write", f)
      .then((response) => {
        dispatch(modalsActions.closeModal())
        toast.success("PEEK 입력 완료");
        setWriteData("");
        emojiCall();
      })
      .catch((response) => {
        setWriteData("");
        console.log(response);
        toast.error("ERROR");
        dispatch(modalsActions.closeModal())
      })

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
            <textarea onChange={handleWrite} className={classes.text} maxLength={120}></textarea>
            <div className={classes.charCount}>{currentLength}/120</div>
        </div>
        <div className={classes.imgthrow}>
          <button className={classes.button} onClick={postWrite} disabled={isButtonDisabled}>입력 완료</button> {/* 수정된 부분 */}
        </div>
      </Modal>
    </>
  );
}

export default ModalWrite;
