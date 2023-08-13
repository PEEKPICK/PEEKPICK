import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import classes from "./CreateReadChat.module.css";

const RestTime = () => {
  // 채팅 시간
  const [timeLeft, setTimeLeft] = useState(0);
  const createTime = useSelector((state) => state.roomId.createTime);
  const endTime = useSelector((state) => state.roomId.endTime);
  // -----------------------------------------------------------
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec}`;
  };
  useEffect(() => {
    console.log("createTime", createTime);
    if (createTime && endTime) {
      const koreaTime = new Date(endTime);
      koreaTime.setHours(koreaTime.getHours() + 9);
      setTimeLeft((koreaTime - new Date()) / 1000);
    }
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft <= 0) {
      setTimeLeft("Time's up!");
    }
  }, [timeLeft]);

  // -----------------------------------------------------------

  return (
    <>
      <div className={classes.time}>{typeof timeLeft === "string" ? timeLeft : formatTime(timeLeft)}</div>
    </>
  );
};

export default RestTime;
