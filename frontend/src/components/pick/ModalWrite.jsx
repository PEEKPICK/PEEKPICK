import React, { useState } from "react";
import { customAxios } from "../../api/customAxios";
import classes from './ModalWrite.module.css';
import Modal from "react-modal";
const ModalWrite = ({ setWrite,write }) => {
  const [writeData, setWriteData] = useState("");
  const [imgData, setImgData] = useState("");
  const handleWrite = (e) => {
    setWriteData(e.target.value);
  }
  const handleCloseModal= ()=>{
    setWrite(!write);
  }
  const postWrite = () => {
    let f = new FormData();
    f.append("content", writeData);
    f.append("longitude", 127.0);
    f.append("latitude", 37.0);
    f.append("img",imgData);
    customAxios.post("/peek/write", f)
      .then((response) => {
        console.log(response);
        console.log([...f.entries()]);
        setWrite(false);
      })
      .catch((response) => {
        console.log(response);
      })
  }
  const imgAccept = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      console.log('Selected image:', selectedImage);
      setImgData(selectedImage)
    }
  };
  return (
    <Modal 
    isOpen={write}
    onRequestClose={() => handleCloseModal()}
    className={classes.modalMain}
    >
      <div className={classes.top}>
        <span>흔적 남기기</span>
        <img src="img/cancel.png" alt="" />
      </div>
      <hr />
      <input type="text" onChange={handleWrite} />
      <input type="file" accept="image/*" onChange={imgAccept} />
      <button onClick={postWrite}>입력 완료</button>
    </Modal>
  );
}

export default ModalWrite;