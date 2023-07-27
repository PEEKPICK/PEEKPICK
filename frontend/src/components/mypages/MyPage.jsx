import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import classes from './MyPage.module.css';
import LogOut from './LogOut';
import SignOut from './SignOut';
import PickAndLike from './PickAndLike';
import NickNameEdit from './NickNameEdit';
const MyPage = () => {
  const [visible, setVisible] = useState(false);
  const [logoutView, setLogoutView] = useState(false);
  const [signoutView,setSignoutView] = useState(false);
  const [nicknameView,setNicknameView] = useState(false);
  const onSettings= ()=>{
    setVisible(!visible);
  }
  const onNicknameEdit=()=>{
    console.log('hi')
    setNicknameView(!nicknameView);
  }
  return (
    <div className={classes.backgroundcolor}>
      {logoutView && <LogOut setLogoutView={setLogoutView}/>}
      {signoutView && <SignOut setSignoutView={setSignoutView}/>}
      {nicknameView && <NickNameEdit setNicknameView={setNicknameView}/>}
      {visible && <Settings setVisible={setVisible} setLogoutView={setLogoutView} setSignoutView={setSignoutView}/>}
      <div className={classes.basic}>
        <h2 className={classes.mypage}>마이페이지</h2>
        {/* 설정 버튼 components 제작 고려중 or 클릭시 components 이동 */}
        <img src="img/setting.png" alt="클릭해라" className={classes.settings} onClick={onSettings}/>
      </div>
      <div>
        {/* 프로필 사진 클릭시 components // props로 이미지 가져오기 생각중 */}
        <img src="" alt="" />
        {/* 닉네임 ex)귀티나는 지각생 // props로 가져올 듯 */}
        <h1>{}</h1>
        {/* 프로필 수정 버튼 -> 컴포넌트 이동 */}
        <div>
        <img src="img/pencil.png" alt="" className={classes.img} onClick={onNicknameEdit}/>
        </div>
      </div>
      <div>
        <PickAndLike/>
        {/* pick 한 횟수, 좋아요 버튼 -> components 자리 */}
      </div>
      <hr />
      <img src="" alt="" />
      <div>
        <h3>좋아하는 것</h3>
        {/* 좋아요 수정 components */}
        <Link to={"/likeedit"} style={{ textDecoration: "none" ,color:"black"}}>
          <div>
            <p>수정</p>
          </div>
        </Link>
        <div>
          {/* 여기는 본인이 선택한 취향 components */}
        </div>
        <h3>싫어하는 것</h3>
        {/* 싫어요 수정 components */}
        <Link to={"/hateedit"} style={{ textDecoration: "none" ,color:"black"}}>
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
    </div>
  );
};

export default MyPage;