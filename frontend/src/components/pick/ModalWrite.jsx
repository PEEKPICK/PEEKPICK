import React, { useState, useRef } from "react";
import { customAxios } from "../../api/customAxios";
import classes from './ModalWrite.module.css';
import Modal from "react-modal";
import { toast } from 'react-hot-toast';
import { useSelector,useDispatch } from "react-redux";
import { modalsActions } from "../../store/modalsSlice";

const ModalWrite = ({emojiCall}) => {
  const isModalState = useSelector((state) => state.modals.isOpen);
  const dispatch = useDispatch();
  // 글 작성에 필요한 데이터
  // 그냥 창을 닫았을 경우, 이 작업을 해주지 않으면, 다시 글 작성을 할 때, 데이터가 남아 있음.
  const [writeData, setWriteData] = useState("");
  const [imgData, setImgData] = useState("");
  const imageInput = useRef();

  const [imgFile, setImgFile] = useState("");
  const handleWrite = (e) => {
    setWriteData(e.target.value);
  }
  const handleCloseModal = () => {
    setImgFile("");
    setWriteData("");
    setImgData("");
    dispatch(modalsActions.closeModal())
  }
  const postWrite = () => {
      // textarea에 입력 값이 없는 경우
  if (!writeData.trim()) {
  toast.error("입력하세요", {
    id: 'textareaIsEmpty'  
  });
    return;  
  }
  
    let f = new FormData();
    f.append("content", writeData);
    f.append("longitude", 127.0);
    f.append("latitude", 37.0);
    f.append("img", imgData);
    customAxios.post("/peek/write", f)
      .then((response) => {
        console.log(response);
        toast.success("PEEK 성공");
        setImgFile("");
        setWriteData("");
        setImgData("");
        dispatch(modalsActions.closeModal())
        emojiCall();
      })
      .catch((response) => {
        setImgFile("");
        setWriteData("");
        setImgData("");
        console.log(response);
        toast.error("ERROR");
        dispatch(modalsActions.closeModal())
      })
  }
  const imgAccept = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    if (selectedImage) {
      console.log('Selected image:', selectedImage);
      setImgData(selectedImage)
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setImgFile(reader.result);
        console.log(imgFile)
      };
    }
  };

  const onCickImageUpload = () => {
    imageInput.current.click();
  };
  return (

    <>

        <Modal
          isOpen={isModalState}
          onRequestClose={() => handleCloseModal()}
          className={classes.modalMain}

        >
          <div className={classes.top}>
            <span>흔적 남기기</span>
            <img src="img/cancel.png" alt="" onClick={handleCloseModal} />
          </div>
          <hr className={classes.hr} />
          <div className={classes.content}>
            <textarea onChange={handleWrite} className={classes.text} ></textarea>
          </div>
          <div className={classes.name}>
            {imgData.name}
          </div>
          <div className={classes.imgthrow}>
            <button onClick={onCickImageUpload} className={classes.btn}>이미지업로드</button>
            <input ref={imageInput} type="file" accept="image/*" onChange={imgAccept} className={classes.imginput} />
          </div>
          <div className={classes.imgthrow}>
            <button className={classes.button} onClick={postWrite}>입력 완료</button>
          </div>
        </Modal>
    </>

  );
}

export default ModalWrite;