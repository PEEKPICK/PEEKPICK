import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import classes from './MyPage.module.css';
import { Outlet } from 'react-router-dom';
const MyPage = () => {
  const [visible, setVisible] = useState(false);
  const onSettings= ()=>{
    setVisible(!visible);
  }
  // const offSettings=()=>{
  //   if(visible){
  //     setVisible(false)
  //   }
  // }
  return (
    // <div onClick={offSettings}>
    <div>
      {visible && <Settings view={visible}/>}
      <div className={classes.basic}>
        <h2>마이페이지</h2>
        {/* 설정 버튼 components 제작 고려중 or 클릭시 components 이동 */}
        <img src="img/setting.png" alt="클릭해라" className={classes.img} onClick={onSettings}/>
      </div>
      <div>
        {/* 프로필 사진 클릭시 components // props로 이미지 가져오기 생각중 */}
        <img src="" alt="" />
        {/* 닉네임 ex)귀티나는 지각생 // props로 가져올 듯 */}
        <h1>{ }</h1>
        {/* 프로필 수정 버튼 -> 컴포넌트 이동 */}
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <div>
        {/* pick 한 횟수, 좋아요 버튼 -> components 자리 */}
      </div>
      <hr />
      <img src="" alt="" />
      <div>
        <h3>좋아하는 것</h3>
        {/* 좋아요 수정 components */}
        <Link to={"/likeedit"}>
          <div>
            <p>수정</p>
          </div>
        </Link>
        <div>
          {/* 여기는 본인이 선택한 취향 components */}
        </div>
        <h3>싫어하는 것</h3>
        {/* 싫어요 수정 components */}
        <Link to={"/hateedit"}>
          <div>
            <p>수정</p>
          </div>
        </Link>
        <div>
          {/* 여기는 본인이 선택한 취향 componenets */}
        </div>
      </div>
      <hr />
      <div>
        {/* 고객센터 */}
        <img src="img/customerservicecenter.png" alt="고객 센터" />
      </div>
      {/* <div>
        <NavigationBar />
      </div> */}
      <Outlet />
    </div>
  );
};

export default MyPage;