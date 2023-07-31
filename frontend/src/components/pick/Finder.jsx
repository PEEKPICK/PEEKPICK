import React, { useEffect, useState } from "react";
// import classes from "./Finder.module.css";
// import Modal from "react-modal";
import { customAxios } from "../../api/customAxios";

function Finder() {
  console.log("최초 렌더링");

  useEffect(() => {
    console.log("wo렌더링");
    emojiCall();
  }, []);

  const emojiCall = () => {
    customAxios
      .get("/posts")
      .then((response) => {
        const data = response.data.data;

        // avatarId들을 추출하여 콘솔에 출력
        const avatarIds = data.map((post) => post.avatarId);
        console.log("avatarId들:", avatarIds);
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
      });
  };

  return (
    <>
      <div>aa</div>
    </>
  );
}

export default Finder;
