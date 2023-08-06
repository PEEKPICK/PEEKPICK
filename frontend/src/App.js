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
// import { useSelector, useDispatch } from "react-redux";
// import { locationActions } from "./store/locationSlice";
// import { customAxios } from "./api/customAxios";
// 기타공용
import Layout from "./components/common/Layout";
import AlreadyLogin from "./components/common/AlreadyLogin";

function App() {
  // 토큰 검사
  // const isAuthenticated = true;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PWA 적용을 위한 vh변환 함수
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    // vh변환 함수 작동
    setScreenSize();

    const checkTokenInLocalStorage = () => {
      const token = localStorage.getItem("jwtToken");
      return token !== null;
    };
    setIsAuthenticated(checkTokenInLocalStorage());
  }, []);

  // sse연결 할꺼니??!?!?!?!?sse연결 할꺼니??!?!?!?!?sse연결 할꺼니??!?!?!?!?sse연결 할꺼니??!?!?!?!?
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
  //     eventSource = new EventSource(`ttp://192.168.31.27:8081/picker/sse/14`, {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhdXRoIiwiYXZhdGFySWQiOiIxNiIsInByb3ZpZGVyIjoibm9uZSIsImV4cCI6MTY5MTEzODI1NywiaWF0IjoxNjkxMDUxODU3fQ.LxvrptoKP1zov91wGhI0k2r-57lkTb25NLAjCqSlCnA4HsrvemMwENon9TraljYJX3EL6SzkpkpDOicEcYILyA`,
  //       },
  //     });

  //     eventSource.onmessage = (event) => {
  //       console.log("result", event.data);
  //     };
  //   }
  // }, [getMemberId, getPointX, getPointY, eventSource]);

  //앱을 보는중이니?!!?!?!앱을 보는중이니?!!?!?!앱을 보는중이니?!!?!?!앱을 보는중이니?!!?!?!
  // const dispatch = useDispatch();
  // const getPointX = useSelector((state) => state.geo.point.x);
  // const getPointY = useSelector((state) => state.geo.point.y);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           // 위치값을 Redux store에 저장합니다.
  //           dispatch(
  //             locationActions.updateLoc({
  //               point: {
  //                 x: position.coords.longitude,
  //                 y: position.coords.latitude,
  //               },
  //               distance: 10000000,
  //             })
  //           );
  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       );
  //     } else {
  //       console.error("위치 못가져왔는디");
  //     }
  //     if (document.visibilityState === "visible") {
  //       // 앱이 포그라운드에 있을 때
  //       console.log("접속했다리");
  //       const requestBody = {
  //         point: {
  //           x: getPointX,
  //           y: getPointY,
  //         },
  //       };
  //       customAxios.post("/picker/connect", requestBody).then((response) => {
  //         console.log(response);
  //       });
  //     } else {
  //       // 앱이 백그라운드에 있을 때
  //       console.log("나갔다리");
  //       customAxios.post("/picker/disconnect").then((response) => {
  //         console.log(response);
  //       });
  //     }
  //   };
  //   //초기 실행
  //   handleVisibilityChange();

  //   //실행
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   //종료
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [dispatch, getPointX, getPointY]);

  return (
    <div className="App">
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
