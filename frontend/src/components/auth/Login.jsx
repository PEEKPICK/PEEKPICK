import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import common from "./style/Common.module.css";
import classes from "./style/Login.module.css";
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();

  const loginHandler = (service) => {
    window.location.href = `https://peekpick.online/api/oauth2/authorization/${service}`;
  };

  const goBranding = () => {
    navigate("/branding");
  };

  // 첫 사용자만 뜨게 하는 페이지
  useEffect(() => {
    console.log(
      `%c      ██████╗ ███████╗███████╗██╗  ██╗██████╗ ██╗ ██████╗██╗  ██╗    
      %c██╔══██╗██╔════╝██╔════╝██║ ██╔╝██╔══██╗██║██╔════╝██║ ██╔╝    
      %c██████╔╝█████╗  █████╗  █████╔╝ ██████╔╝██║██║     █████╔╝     
      %c██╔═══╝ ██╔══╝  ██╔══╝  ██╔═██╗ ██╔═══╝ ██║██║     ██╔═██╗     
      %c██║     ███████╗███████╗██║  ██╗██║     ██║╚██████╗██║  ██╗    
      %c╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝`,
      "color: #7D00FF;",
      "color: #7D00FF;",
      "color: #7D00FF;",
      "color: #7D00FF;",
      "color: #7D00FF;",
      "color: #7D00FF;"
    );

    const storedIsNewUser = localStorage.getItem("isNewUser");
    if (storedIsNewUser !== "true") {
      localStorage.setItem("isNewUser", "true");
      navigate("/branding");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.container}>
      <img src="img/LoginEyesPin.gif" alt="background" className={classes.background} />
      <div className={classes.emobox}>
        <img src="img/login/Beaming Face with Smiling Eyes.gif" className={classes.e0} alt="이모지0" />
        <img src="img/login/Cold Face.gif" alt="이모지1" className={classes.e1} />
        <img src="img/login/Confounded Face.gif" alt="이모지2" className={classes.e2} />
        <img src="img/login/Cowboy Hat Face.gif" alt="이모지3" className={classes.e3} />
      </div>
      <div className={classes.buttons}>
        <img
          src="img/service_information.svg"
          className={classes.b1}
          alt="service_information"
          onClick={() => goBranding()}
        />
        <img src="img/kakao_login.svg" className={classes.b2} alt="kakao" onClick={() => loginHandler("kakao")} />
        {/* <img src="img/naver_login.png" alt="naver" onClick={() => loginHandler('naver')} /> */}
        <img
          src="img/naver_login.svg"
          className={classes.b3}
          alt="naver"
          onClick={() => toast.error("개발 중인 서비스입니다.")}
        />
        <img src="img/google_login.svg" className={classes.b4} alt="google" onClick={() => loginHandler("google")} />
      </div>
    </div>
  );
};

export default Login;
