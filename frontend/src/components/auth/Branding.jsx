import { useNavigate } from 'react-router-dom';

import classes from './style/Branding.module.css';

const Branding = () => {
  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate('/');
  };

  return (
    <div className={classes.container}>
      <div className={classes.mainImg}>
        <img src="img/branding_img.png" alt="branding_img" />
      </div>
      <div className={classes.titleContainer}>
        <div className={classes.title}>
          <div className={classes.titleItem}>취향을 선택하고</div>
          <div>이야기를 나눠보세요.</div>
        </div>
        <div className={classes.subTitle}>
          <div className={classes.subtitleItem}>위치를 기반으로 익명의 사용자와 이야기를 나눠보세요.</div>
          <div>다양한 취향의 사람들과 각자의 취향에 대해 이야기해보세요.</div>
        </div>
        <div className={classes.buttonWrap}>
          <div
            className={classes.go}
            onClick={() => moveToLogin()}
          >함께 하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branding;