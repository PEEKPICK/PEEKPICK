import classes from './style/Login.module.css';

const Login = () => {
  const loginHandler = (service) => {
      window.location.href = `http://localhost:8081/oauth2/authorization/${service}`;
  };

  return (
    <div className={classes.container}>
      <div className={classes.buttons}>
        <button onClick={() => loginHandler('kakao')}>카카오 로그인</button>
        <button onClick={() => loginHandler('naver')}>네이버 로그인</button>
        <button onClick={() => loginHandler('google')}>구글 로그인</button>
      </div>
    </div>
  );
}

export default Login;
