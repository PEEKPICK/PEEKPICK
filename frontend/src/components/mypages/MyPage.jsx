import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import classes from './MyPage.module.css';
import LogOut from './LogOut';
import SignOut from './SignOut';
import PickAndLike from './PickAndLike';
import NickNameEdit from './NickNameEdit';
import { customAxios } from '../../api/customAxios';
import { useDispatch,useSelector } from 'react-redux';
import { authActions } from '../../store/authSlice';
const MyPage = () => {
  // 상태관리
  const [visible, setVisible] = useState(false);
  const [logoutView, setLogoutView] = useState(false);
  const [signoutView, setSignoutView] = useState(false);
  const [nicknameView, setNicknameView] = useState(false);
  const [ModalOutSide, setModalOutSide] = useState(false);
  const [useremoji,setUseremoji] = useState("");
  const userInfo = useSelector(state => state.auth);
  // 정보 확인
  const dispatch = useDispatch();
  const [emojiUrl, setEmojiUrl] = useState("");

  // 토큰 처리
  const jwtToken = localStorage.getItem('jwtToken');

  // 이름과 한줄평 가져오는 usestate
  const [bio,setBio] = useState(userInfo.bio);
  const [nickname,setNickname] = useState(userInfo.nickname);
  const [prefix,setPrefix] = useState(userInfo.prefix);

  // 페이지 렌더링 시 작동
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

  // 함수 정의
  const onSettings = () => {
    setVisible(!visible);
  }
  const onNicknameEdit = () => {
    setNicknameView(!nicknameView);
  }

  // api통신
  useEffect(() => {
    const headers = {
      Authorization : `Bearer ${jwtToken}`
    };
  
    const fetchData = async () => {
      try {
        const response = await customAxios.get("/member/info", { headers });
        setEmojiUrl(response.data.data.emoji.imageUrl);
        setUseremoji(response.data.data.emoji.imageUrl);
        setBio(response.data.data.bio);
        setNickname(response.data.data.nickname);
        setPrefix(response.data.data.prefix.content);
        const sendToMyPageData = {
          emojiUrl: response.data.data.emoji.imageUrl,
        };
        const sendToUserNicknameData={
          bio:bio,
          nickname:nickname,
          prefix:prefix,
        }
        dispatch(authActions.updateMyPageProfile(sendToMyPageData));
        dispatch(authActions.updateUserNickname(sendToUserNicknameData));
      } catch (error) {
        console.log(error);
        console.log(useremoji);
        console.log(emojiUrl);
      }
    };
    fetchData(); // useEffect 내부에서 async 함수 호출
  }, [dispatch, emojiUrl, useremoji, jwtToken,bio,nickname,prefix]);
  return (
    <div className={classes.mypage}>
      {logoutView && <LogOut setLogoutView={setLogoutView} />}
      {signoutView && <SignOut setSignoutView={setSignoutView}/>}
      {nicknameView && <NickNameEdit setNicknameView={setNicknameView} propPrefix={setPrefix} propBio={setBio} propNickname={setNickname}/>}
      {visible && <Settings setVisible={setVisible} setLogoutView={setLogoutView} setSignoutView={setSignoutView} />}
      <div className={classes.mypagetopbackgroundcolor}>
        <div className={classes.mypagetop}>
          <span>마이페이지</span>
          {/* 설정 버튼 components 제작 고려중 or 클릭시 components 이동 */}
          {ModalOutSide ?
            <img src="img/setting.png" alt="클릭해라" className={classes.settingimg} /> :
            <img src="img/setting.png" alt="클릭해라" onClick={onSettings} className={classes.settingimg} />}
        </div>
        <div className={classes.profileimg}>
          {/* 프로필 사진 클릭시 components // props로 이미지 가져오기 생각중 */}
          {ModalOutSide ?
            <img src={userInfo.emojiUrl} alt="" />
            :
            <Link to="/profile">
              <img src={userInfo.emojiUrl} alt="" />
            </Link>}
        </div>
      </div>
      <div className={classes.profilename}>
        {/* 닉네임 ex)귀티나는 지각생 // props로 가져올 듯 */}
        <span>{prefix +" "+ nickname}</span>
        {/* 프로필 수정 버튼 -> 컴포넌트 이동 */}
        {ModalOutSide ? <img src="img/pencil.png" alt="" /> :
          <img src="img/pencil.png" alt="" onClick={onNicknameEdit} />
        }
      </div>
      <div className={classes.oneline}>
        <span>{bio}</span>
      </div>
      <div>
        <PickAndLike />
        {/* pick 한 횟수, 좋아요 버튼 -> components 자리 */}
      </div>
      <hr className={classes.hr} />
      <img src="" alt="" />
      <div className={classes.likehate}>
        <span>좋아하는 것</span>
        {/* 좋아요 수정 components */}
        {ModalOutSide ?
          <button>수정</button> :
          <Link to={"/likeedit"}>
            <button>수정</button>
          </Link>}
      </div >
      <div>
        {/* 여기는 본인이 선택한 취향 components */}
      </div>

      <div className={classes.likehate}>
        <span>싫어하는 것</span>
        {/* 싫어요 수정 components */}
        {ModalOutSide ?
          <button >수정</button> :
          <Link to={"/hateedit"}>
            <button >수정</button>
          </Link>}
      </div>
      <div>
        {/* 여기는 본인이 선택한 취향 componenets */}
      </div>
      <hr className={classes.hr} />

      {/* 고객센터 */}
      <div className={classes.customercenterimg}>
        <img src="img/customerservicecenter.png" alt="고객 센터" />
      </div>
    </div>
  );
};

export default MyPage;