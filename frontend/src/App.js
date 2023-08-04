import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";

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
import Redirect from "./components/auth/Redirect";
// 용범
import MyPage from "./components/mypages/MyPage";
import Announcement from "./components/mypages/Announcement";
import LikeEdit from "./components/mypages/LikeEdit";
import HateEdit from "./components/mypages/HateEdit";
import Profile from "./components/mypages/Profile";
// 동민
import Picker from "./components/pick/Picker";
import Peek from "./components/pick/Peek";
// 기타공용
import Layout from "./components/common/Layout";
import AlreadyLogin from "./components/common/AlreadyLogin";
// import { useEffect } from "react";

function App() {
  // 토큰 검사
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenInLocalStorage = () => {
      const token = localStorage.getItem("jwtToken");
      return token !== null;
    };
    setIsAuthenticated(checkTokenInLocalStorage());
  }, []);

  
  // const getMemberId = useSelector((state) => state.geo.memberId);
  // const getPointX = useSelector((state) => state.geo.point.x);
  // const getPointY = useSelector((state) => state.geo.point.y);

  // let eventSource = null;
  // useEffect(() => {
  //   if (getMemberId !== null && getPointX !== null && getPointY !== null) {
  //     // const requestBody = {
  //     //   memberId: getMemberId,
  //     //   point: {
  //     //     x: getPointX,
  //     //     y: getPointY,
  //     //   },
  //     // };
  //     eventSource = new EventSource(`http://192.168.31.27:8081/picker/sse/14`, {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdXRoIiwiYXZhdGFySWQiOiIxNiIsInByb3ZpZGVyIjoibm9uZSIsImV4cCI6MTY5MTEzODI1NywiaWF0IjoxNjkxMDUxODU3fQ.LxvrptoKP1zov91wGhI0k2r-57lkTb25NLAjCqSlCnA4HsrvemMwENon9TraljYJX3EL6SzkpkpDOicEcYILyA`,
  //       },
  //     });

  //     eventSource.onmessage = (event) => {
  //       console.log("result", event.data);
  //     };
  //   }
  // }, [getMemberId, getPointX, getPointY, eventSource]);

  return (
    <div>
      {/* 라우터 */}
      <Routes>
        <>
          {!isAuthenticated && (
            <>
              {/* 준형 */}
              <Route path="/" element={<Login />} />
              <Route path="/oauth2/redirect" element={<Redirect />} />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/usernickname" element={<UserNickname />} />
              <Route path="/userlike" element={<UserLike />} />
              <Route path="/UserLikeHate" element={<UserLikeHate />} />
              <Route path="/userhate" element={<UserHate />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/*" element={<AlreadyLogin />} />
            </>
          )}
          {isAuthenticated && (
            <>
              <Route path="/" element={<Layout />}>
                <Route index element={<Picker />} />
                <Route path="peek" element={<Peek />} />
                {/* 용범  */}
                <Route path="mypage" element={<MyPage />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="/announcement" element={<Announcement />} />
              <Route path="/likeedit" element={<LikeEdit />} />
              <Route path="/hateedit" element={<HateEdit />} />
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
