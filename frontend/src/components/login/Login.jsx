import react from "react";
import classes from "./Login.module.css"

const Login = () => {
  return (
    // <div className="h-screen w-screen bg-[url('./assets/loginBackgroundImage.png')] bg-cover">
    <div className={classes.background}>
      <div className={classes.container}>
        <button>카카오 로그인</button>
        <button>네이버 로그인</button>
        <button>구글 로그인</button>
      </div>
    </div>
  );
};

export default Login;