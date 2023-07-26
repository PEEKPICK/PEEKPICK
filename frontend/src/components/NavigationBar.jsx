import React from 'react';
// import ChartAlert from './ChatAlert';
import { Link } from 'react-router-dom';
import classes from './NavigationBar.module.css';
const NavigationBar = () => {

  return (
    <div className={classes.basic}>
      <div>
        {/* 알림 올경우 생성되는 알림창 components */}
        {/* <ChartAlert></ChartAlert> */}
      </div>

      {/* 개별적으로 클릭시 그쪽 색상 들어오게 div css 설정 잘하기 */}
      <nav className={classes.navi}>
      <Link to="/picky" className={classes.self}>
        <div>
          <img src="img/heartBlack.png" alt="" />
          {/* <img src="img/heartWhite.png" alt="" /> */}
          <p>이슈</p>
        </div>
      </Link>
      <Link to={"/picker"} className={classes.self}>
        <div>
          <img src="img/finderBlack.png" alt="" />
          {/* <img src="img/finderWhite.png" alt="" /> */}
          <img src="" alt="" />
          <p>사람</p>
        </div>
      </Link>
      <Link to={"/mypage"} className={classes.self}>
        <div>
          <img src="img/mypageBlack.png" alt="" />
          {/* <img src="img/mypageWhite.png" alt="" /> */}
          <p>프로필</p>
        </div>
      </Link>
      </nav>
    </div>
  );
}

export default NavigationBar;