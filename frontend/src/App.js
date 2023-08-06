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
import { locationActions } from "./store/locationSlice";
// import { EventSourcePolyfill } from "event-source-polyfill";

// 기타공용
import { customAxios } from "./api/customAxios";
import Layout from "./components/common/Layout";
import AlreadyLogin from "./components/common/AlreadyLogin";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sseURL = "https://i9b309.p.ssafy.io/api/picker/sse";
        const eventSource = new EventSource(sseURL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        eventSource.addEventListener("sse", function (event) {
          console.log("event.data", event.data);
          const data = JSON.parse(event.data);
          console.log("data", data);
        });
        eventSource.onmessage = (event) => {
          console.log("result", event.data);
        };
      } catch (error) {}
    };

    fetchData();
  }, []);

  //앱을 보는중이니?!!?!?!앱을 보는중이니?!!?!?!앱을 보는중이니?!!?!?!앱을 보는중이니?!!?!?!
  const myPos = useSelector((state) => state.location.userPos);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          const updatedPos = {
            point: {
              x: position.coords.longitude,
              y: position.coords.latitude,
            },
            distance: 1000000000,
          };
          // 위치 정보를 스토어에 저장
          dispatch(
            locationActions.updateLoc({
              point: {
                x: updatedPos.point.x,
                y: updatedPos.point.y,
              },
              distance: updatedPos.distance,
            })
          );
          console.log("App에서 위치", myPos);

          if (document.visibilityState === "visible") {
            // 앱이 포그라운드에 있을 때
            try {
              await customAxios.post("/picker/connect", {
                point: {
                  x: updatedPos.point.x,
                  y: updatedPos.point.y,
                },
              });
              console.log("CONNET", document.visibilityState);
            } catch (error) {
              console.error("CONNET 에러:", error);
            }
          } else if (document.hidden === true) {
            // 앱이 백그라운드에 있을 때
            try {
              await customAxios.post("/picker/disconnect");
              console.log("DISCONNECT", document.hidden);
            } catch (error) {
              console.error("DISCONNECT 에러:", error);
            }
          }
        } catch (error) {
          console.error("위치 못가져왔는디:", error);
        }
      } else {
        console.error("Geolocation을 지원하지 않습니다.");
      }
    };

    // 초기 실행
    handleVisibilityChange();

    // 실행
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 종료
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch, myPos]);

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
