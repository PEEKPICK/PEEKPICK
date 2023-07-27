import "./App.css";
import { Routes, Route } from "react-router-dom";
// 2023. 07. 27 Redux작업을 위한 useEffect, Dispatch, axios, authActions 추가
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/authSlice";
import axios from "axios";

// router import
// 준형
import Login from "./components/auth/Login";
import UserInfo from "./components/auth/UserInfo";
import UserProfile from "./components/auth/UserProfile";
import UserNickname from "./components/auth/UserNickname";
import UserLike from "./components/auth/UserLike";
import UserHate from "./components/auth/UserHate";
import Welcome from "./components/auth/Welcome";
import UserLikeHate from "./components/auth/UserLikeHate";
// 용범
import MyPage from "./components/mypages/MyPage";
import Profile from "./components/mypages/Profile";
import Announcement from "./components/mypages/Announcement";
import LikeEdit from "./components/mypages/LikeEdit";
import HateEdit from "./components/mypages/HateEdit";
// 동민
import Picker from "./components/pick/Picker";
import Picky from "./components/pick/Picky";
// 기타공용
import Layout from "./components/Layout";
import AlreadyLogin from "./components/AlreadyLogin";

function App() {
  // 2023. 07. 27 리덕스 작업 (유저 정보 저장)
  const dispatch = useDispatch();
  useEffect(() => {
    const value = 14;
    // const userAPI = 'https://react-http-4710c-default-rtdb.firebaseio.com/user.json';
    const userAPI = `http://192.168.31.26:8081/member/signup/info?id=${value}`;

    axios.get(userAPI)
      .then(response => {
        const userData = response.data.data;

        dispatch(authActions.updateUserInfo({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          birthday: userData.birthday,
          gender: userData.gender,
        }));

        dispatch(authActions.updateProfile({
          emojiId: userData.emojiId
        }));

        dispatch(authActions.updateUserNickname({
          prefixId: userData.prefixId,
          nickname: userData.nickname,
        }));
      })
      .catch(error => {
        console.log('에러 내용 : ', error);
      })
  }, [dispatch])

  const isAuthenticated = true; // 추후 변경 예정 (로그인 토큰입니다.)

  return (
    <div>
      {/* 라우터 */}
      <Routes>
        <>
          {!isAuthenticated && (
            <>
              <Route path="/*" element={<Login />} />
            </>
          )}
          {isAuthenticated && (
            <>
              <Route path="/" element={<Layout />}>
                <Route index element={<Picker />} />
                <Route path="picky" element={<Picky />} />
                {/* 용범  */}
                <Route path="mypage" element={<MyPage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="announcement" element={<Announcement />} />
                <Route path="likeedit" element={<LikeEdit />} />
                <Route path="hateedit" element={<HateEdit />} />
              </Route>
              {/* 준형 */}
              <Route path="/login" element={<Login />} />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/usernickname" element={<UserNickname />} />
              <Route path="/userlike" element={<UserLike />} />
              <Route path="/UserLikeHate" element={<UserLikeHate />} />
              <Route path="/userhate" element={<UserHate />} />
              <Route path="/welcome" element={<Welcome />} />
              {/* 기타 */}
              <Route path="/*" element={<AlreadyLogin />} />
            </>
          )}
        </>
      </Routes>
    </div>
  );
}

export default App;
