import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const RestTime = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  // Mock values for createTime and endTime
  const createTime = useSelector((state) => state.roomId.createTime);
  const endTime = useSelector((state) => state.roomId.endTime);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec}`;
  };

  useEffect(() => {
    console.log(createTime);
    console.log();
    if (createTime && endTime) {
      const koreaTime = new Date(endTime);
      koreaTime.setHours(koreaTime.getHours() + 9);
      setTimeLeft((koreaTime - new Date()) / 1000);
    }
  }, [createTime, endTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setTimeLeft("Time's up!");
    }
  }, [timeLeft]);

  return (
    <>
      <p>{typeof timeLeft === "string" ? timeLeft : formatTime(timeLeft)}</p>
    </>
  );
};

export default RestTime;
