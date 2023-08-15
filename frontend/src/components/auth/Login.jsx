import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import common from "./style/Common.module.css";
import classes from "./style/Login.module.css";
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();

  const loginHandler = (service) => {
    window.location.href = `https://i9b309.p.ssafy.io/api/oauth2/authorization/${service}`;
  };

  const goBranding = () => {
    navigate('/branding');
  };

  // 첫 사용자만 뜨게 하는 페이지  
  useEffect(() => {
    const storedIsNewUser = localStorage.getItem('isNewUser');
    if (storedIsNewUser === 'false') {
    } else {
      localStorage.setItem('isNewUser', 'false');
      navigate('/branding');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={common.side}>
      <div className={classes.container}>
        <img src="img/temp_background.png" alt="background" className={classes.background} />
        <div className={classes.buttons}>
          <img src="img/service_information.svg" alt="service_information" onClick={() => goBranding()} />
          <img src="img/kakao_login.png" alt="kakao" onClick={() => loginHandler("kakao")} />
          {/* <img src="img/naver_login.png" alt="naver" onClick={() => loginHandler('naver')} /> */}
          <img
            src="img/naver_login.png"
            alt="naver"
            onClick={() => toast.error("개발 중인 서비스입니다.")}
          />
          <img src="img/google_login.png" alt="google" onClick={() => loginHandler("google")} />
        </div>
      </div>
    </div>
  );
};

export default Login;
