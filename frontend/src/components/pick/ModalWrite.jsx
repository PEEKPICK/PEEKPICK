import React, { useState } from "react";
import { customAxios } from "../../api/customAxios";
import classes from './ModalWrite.module.css'
const ModalWrite = ({ setWrite }) => {
  const [writeData, setWriteData] = useState("");
  const [imgData, setImgData] = useState("");
  const handleWrite = (e) => {
    setWriteData(e.target.value);
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
    <div className={classes.container}>
      <div className={classes.top}>
        <span>흔적 남기기</span>
        <img src="img/cancel.png" alt="" />
      </div>
      <hr />
      <input type="text" onChange={handleWrite} />
      <input type="file" accept="image/*" onChange={imgAccept} />
      <button onClick={postWrite}>입력 완료</button>
    </div>
  );
}

export default ModalWrite;