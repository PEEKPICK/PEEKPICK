import React, { useEffect, useState } from 'react';
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
  const [signoutView, setSignoutView] = useState(false);
  const [nicknameView, setNicknameView] = useState(false);
  const [ModalOutSide, setModalOutSide] = useState(false);

  useEffect(() => {
    if (visible) {
      setModalOutSide(true);
    } else if (logoutView) {
      setModalOutSide(true);
    } else if (signoutView) {
      setModalOutSide(true);
    } else if (nicknameView) {
      setModalOutSide(true);
    } else {
      setModalOutSide(false);
    }

  }, [visible, logoutView, signoutView, nicknameView]);

  const onSettings = () => {
    setVisible(!visible);
  }
  const onNicknameEdit = () => {
    console.log('hi')
    setNicknameView(!nicknameView);
  }
  return (
    <div className={classes.backgroundcolor}>
      {logoutView && <LogOut setLogoutView={setLogoutView} />}
      {signoutView && <SignOut setSignoutView={setSignoutView} />}
      {nicknameView && <NickNameEdit setNicknameView={setNicknameView} />}
      {visible && <Settings setVisible={setVisible} setLogoutView={setLogoutView} setSignoutView={setSignoutView} />}
      <div className={classes.basic}>
        <div className={classes.mypage}>
          <h2>마이페이지</h2>
          {/* 설정 버튼 components 제작 고려중 or 클릭시 components 이동 */}
          {ModalOutSide ?
            <img src="img/setting.png" alt="클릭해라" className={classes.settings} /> :
            <img src="img/setting.png" alt="클릭해라" className={classes.settings} onClick={onSettings} />}
        </div>
        <div className={classes.profileDiv}>
          {/* 프로필 사진 클릭시 components // props로 이미지 가져오기 생각중 */}
          {ModalOutSide ?
            <img src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Grinning%2BCat_p.png" alt="" className={classes.profileImg} />
            :
            <Link to="/profile" className={classes.profileDiv}>
              <img src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Grinning%2BCat_p.png" alt="" className={classes.profileImg} />
            </Link>}
        </div>
      </div>
      <div className={classes.NickNameEdit}>
        {/* 닉네임 ex)귀티나는 지각생 // props로 가져올 듯 */}
        <h1 className={classes.h1}>{ }빛이나는 준형</h1>
        {/* 프로필 수정 버튼 -> 컴포넌트 이동 */}
        {ModalOutSide ? <img src="img/pencil.png" alt="" className={classes.pencil} /> :
          <img src="img/pencil.png" alt="" className={classes.pencil} onClick={onNicknameEdit} />
        }
      </div>
      <div className={classes.oneline}>
        <p >안녕안녕</p>
      </div>
      <div>
        <PickAndLike />
        {/* pick 한 횟수, 좋아요 버튼 -> components 자리 */}
      </div>
      <hr />
      <img src="" alt="" />
      <div className={classes.MypageLikeHate}>
        <h3 className={classes.test}>좋아하는 것</h3>
        {/* 좋아요 수정 components */}
        {ModalOutSide ?
          <button className={classes.editbtn}></button> :
          <Link to={"/likeedit"}>
            <button className={classes.editbtn}>수정</button>
          </Link>}
      </div >
      <div>
        {/* 여기는 본인이 선택한 취향 components */}
      </div>

      <div className={classes.MypageLikeHate}>
        <h3>싫어하는 것</h3>
        {/* 싫어요 수정 components */}
        {ModalOutSide ?
          <button className={classes.editbtn}>수정</button> :
          <Link to={"/hateedit"}>
            <button className={classes.editbtn}>수정</button>
          </Link>}
      </div>
      <div>
        {/* 여기는 본인이 선택한 취향 componenets */}
      </div>
      <hr />
      <div className={classes.customercenter}>
        {/* 고객센터 */}
        <img src="img/customerservicecenter.png" alt="고객 센터" className={classes.customercenterImg} />
      </div>
      {/* <div>
        <NavigationBar />
      </div> */}
    </div>
  );
};

export default MyPage;