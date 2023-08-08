import React, { useState } from "react";
import { customAxios } from "../../api/customAxios";
const ModalWrite = ({ setWrite }) => {
  const [writeData, setWriteData] = useState("");

  const handleWrite = (e) => {
    setWriteData(e.target.value);
  }
  const imgAccept=()=>{
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';
  };

  const postWrite = () => {
    let f = new FormData();
    f.append("content", writeData);
    f.append("longitude", 127.0);
    f.append("latitude", 37.0);

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
  return (
    <div>
      <div>
        <span>흔적 남기기</span>
        <img src="img/cancel.png" alt="" />
      </div>
      <hr />
      <input type="text" onChange={handleWrite} />
      <input type="file" accept="image/*" capture="camera" onClick={imgAccept} />
      <button onClick={postWrite}>입력 완료</button>
    </div>
  );
}

export default ModalWrite;