import React from 'react';
import ChartAlert from './ChatAlert';
import { Link, useLocation } from 'react-router-dom';
import classes from './NavigationBar.module.css';
const NavigationBar = () => {
  const location = useLocation();

  const myPage = location.pathname === '/mypage';
  const picky = location.pathname === '/picky';
  const picker = location.pathname === '/';

  return (
    <div className={classes.container}>
        {/* 알림 올경우 생성되는 알림창 components */}
        <ChartAlert></ChartAlert>
      {/* 개별적으로 클릭시 그쪽 색상 들어오게 div css 설정 잘하기 */}
      <nav className={classes.navibar}>
        {picky ? <Link to="picky" >
          <div className={classes.on}>
            <img src="img/heartWhite.png" alt="" />
            <p>이슈</p>
          </div>
        </Link> :
          <Link to="picky" >
            <div>
              <img src="img/heartBlack.png" alt="" />
              <p>이슈</p>
            </div>
          </Link>}
        {picker ? <Link to={""} >
          <div className={classes.on}>
            <img src="img/finderWhite.png" alt="" />
            <p>사람</p>
          </div>
        </Link> :
          <Link to={""} >
            <div>
              <img src="img/finderBlack.png" alt="" />
              <p>사람</p>
            </div>
          </Link>}
        {myPage ? <Link to={"mypage"}>
          <div className={classes.on}>
            <img src="img/mypageWhite.png" alt="" />
            <p>프로필</p>
          </div>
        </Link> :
          <Link to={"mypage"} >
            <div>
              <img src="img/mypageBlack.png" alt="" />
              <p>프로필</p>
            </div>
          </Link>}
      </nav>
    </div>
  );
}

export default NavigationBar;