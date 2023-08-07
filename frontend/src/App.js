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
import { EventSourcePolyfill } from "event-source-polyfill";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import classes from "./Toast.module.css";
import ToastNotification from "./components/pick/ToastNotification";

// 기타공용
import { customAxios } from "./api/customAxios";
import Layout from "./components/common/Layout";
import AlreadyLogin from "./components/common/AlreadyLogin";
import { useDispatch, useSelector } from "react-redux";

// toast
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Connect | disConnect
  const getPosX = useSelector((state) => state.location.userPos.point.x);
  const getPosY = useSelector((state) => state.location.userPos.point.y);
  // 채팅 수락 | 거절
  // const [showChatRequest, setShowChatRequest] = useState(false);
  // const [chatRequestId, setChatRequestId] = useState(null);
  const [customModal, setIsCustomModal] = useState(false);

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

  //위치 찍어!?!?!위치 찍어!?!?!위치 찍어!?!?!위치 찍어!?!?!위치 찍어!?!?!
  useEffect(() => {
    const handlePosChange = async () => {
      if (isAuthenticated && navigator.geolocation) {
        // console.log("isAuthenticated 인증되었습니다. 위치를 찍습니다.");
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          const updatedPos = {
            point: {
              x: position.coords.longitude,
              y: position.coords.latitude,
            },
            distance: 100000,
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
        } catch (error) {
          console.error("위치 못가져왔는디:", error);
        }
      } else {
        // console.log("위치 또는 토큰이 인증되지 않았습니다.");
      }
    };
    //초기 실행
    handlePosChange();
  }, [dispatch, isAuthenticated]);

  // sse연결 할꺼니??!?!?!?!?sse연결 할꺼니??!?!?!?!?sse연결 할꺼니??!?!?!?!?sse연결 할꺼니??!?!?!?!?
  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        // console.log("isAuthenticated 인증되었습니다. sse를 시도합니다");
        try {
          const sseURL = "https://i9b309.p.ssafy.io/api/picker/sse";
          const eventSource = new EventSourcePolyfill(sseURL, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            heartbeatTimeout: 8640000,
          });

          // eventSource.onopen = async (e) => {
          //   // 연결 시 할 일
          //   console.log("SSE 오픈", e);
          // };

          // 받아오는 data로 할 일
          eventSource.onmessage = (e) => {
            console.log("SSE 메시지", e);
            if (e.data.includes("senderId")) {
              const jsonData = JSON.parse(e.data);
              const senderId = jsonData.senderId;
              console.log("채팅 요청이 왔어요:", senderId);

              setIsCustomModal(true);

              // 토스트 메시지 띄우기
              toast(`채팅 요청이 왔어요. 수락하시겠습니까? ${senderId}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              console.log("연결만 했어");
            }
          };

          eventSource.onerror = (e) => {
            // 종료 또는 에러 발생 시 할 일
            console.log("SSE에러!!!!!!,", e);
            eventSource.close();
          };
        } catch (error) {
          console.log("SSE 생성 오류: ", error);
        }
      }
      // console.log("isAuthenticated이 없습니다. sse를 시도하지 않습니다.");
    };
    fetchData();
  }, [isAuthenticated]);

  //보는 중이니!!?!?!?!?!?!보는 중이니!!?!?!?!?!?!보는 중이니!!?!?!?!?!?!보는 중이니!!?!?!?!?!?!
  useEffect(() => {
    if (document.visibilityState === "visible") {
      // 앱이 포그라운드에 있을 때
      customAxios
        .post("/picker/connect", {
          point: {
            x: getPosX,
            y: getPosY,
          },
        })
        .then(() => {
          console.log("Connect:", document.visibilityState);
        });
    } else {
      // 앱이 백그라운드에 있을 때
      customAxios.post("/picker/disconnect").then((e) => {
        console.log("DISCONNECT:", document.visibilityState);
      });
    }
  }, [getPosX, getPosY]);

  return (
    <div className="App">
      <div>
        <Toaster />
      </div>
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
      {/* ToastContainer를 추가 */}
      {/* <ToastContainer className={classes.toastMain} /> */}
      {customModal ? <ToastNotification /> : ""}

    </div>
  );
}
export default App;
