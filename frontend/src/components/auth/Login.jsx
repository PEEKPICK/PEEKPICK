import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import classes from './style/Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  const loginHandler = (service) => {
    window.location.href = `https://i9b309.p.ssafy.io/api/oauth2/authorization/${service}`;
  };

  const goBranding = () => {
    navigate('/branding');
  }

  return (
    <div className={classes.container}>
      <img
        src="img/temp_background.png"
        alt="background"
        className={classes.background}
      />
      <div className={classes.buttons}>
        <img src="img/kakao_login.png" alt="kakao" onClick={() => loginHandler('kakao')} />
        {/* <img src="img/naver_login.png" alt="naver" onClick={() => loginHandler('naver')} /> */}
        <img src="img/naver_login.png" alt="naver" onClick={() => toast.error('개발 중인 서비스입니다.')} />
        <img src="img/google_login.png" alt="google" onClick={() => loginHandler('google')} />
        <img src="img/service_information.png" alt="service" onClick={() => goBranding()} />
      </div>
    </div>
  );
}

export default Login;
