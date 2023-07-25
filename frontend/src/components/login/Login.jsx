import classes from "./Login.module.css"

const Login = () => {
  return (
    <div className="h-screen w-screen bg-[url('./assets/loginBackgroundImage.png')] bg-cover">
      {/* 백그라운드 이미지 CSS 변경 예정 - tailwindcss -> css */}
      <div className={classes.container}>
        <button>카카오 로그인</button>
        <button>네이버 로그인</button>
        <button>구글 로그인</button>
      </div>
    </div>
  );
};

export default Login;