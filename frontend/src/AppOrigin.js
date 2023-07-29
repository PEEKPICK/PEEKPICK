import "./App.css";
import { Routes, Route } from "react-router-dom";

// router import
// 준형
import Login from "./components/auth/Login";
import UserInfo from "./components/auth/UserInfo";
import UserProfile from "./components/auth/UserProfile";
import UserNickname from "./components/auth/UserNickname";
import UserLike from "./components/auth/UserLike";
import UserHate from "./components/auth/UserHate";
import Welcome from "./components/auth/Welcome";
// 용범
import MyPage from "./components/mypages/MyPage";
import Profile from "./components/mypages/Profile";
import Announcement from "./components/mypages/Announcement";
import LikeEdit from "./components/mypages/LikeEdit";
import HateEdit from "./components/mypages/HateEdit";
// 동민
import Picker from "./components/pick/Picker";
import Picky from "./components/pick/Picky";
// 기타
import NotFound from "./components/NeedLogin";
//

function App() {
  const isAuthenticated = true; // 추후 변경 예정 (로그인 토큰입니다.)

  return (
    <div>
      {/* 라우터 */}
      <Routes>
        {/* 준형 */}
        {isAuthenticated && <Route path="/login" element={<Login />} />}
        {/* 위 코드에 토큰은 !붙여서 처리할 것! */}
        {isAuthenticated && <Route path="/userinfo" element={<UserInfo />} />}
        {isAuthenticated && <Route path="/userprofile" element={<UserProfile />} />}
        {isAuthenticated && <Route path="/usernickname" element={<UserNickname />} />}
        {isAuthenticated && <Route path="/userlike" element={<UserLike />} />}
        {isAuthenticated && <Route path="/userhate" element={<UserHate />} />}
        {isAuthenticated && <Route path="/welcome" element={<Welcome />} />}
        {/* 용범 */}
        {isAuthenticated && <Route path="/mypage" element={<MyPage />} />}
        {isAuthenticated && <Route path="/profile" element={<Profile />} />}
        {isAuthenticated && <Route path="/announcement" element={<Announcement />} />}
        {isAuthenticated && <Route path="/likeedit" element={<LikeEdit />} />}
        {isAuthenticated && <Route path="/hateedit" element={<HateEdit />} />}
        {/* 동민 */}
        {isAuthenticated && <Route path="/picker" element={<Picker />} />}
        {isAuthenticated && <Route path="/picky" element={<Picky />} />}
        {/* 기타 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
