import React, { useState, useEffect } from "react";
import classes from "./ToastNotification.module.css";

const ToastNotification = () => {
  return (
    <div className={classes.toastAlert}>
      <p>입력하지 않은 칸이 있습니다!</p>
    </div>
  );
};

export default ToastNotification;
