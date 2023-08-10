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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastNotification from "./components/pick/ToastNotification";
import { chatActions } from "./store/chatSlice";

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
  // const getOpponent = useSelector((state) => state.roomId.opponent);

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
            distance: 100000000,
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
      }
      // else {
      //   console.log("위치 또는 토큰이 인증되지 않았습니다.");
      // }
    };
    //초기 실행
    handlePosChange();
  }, [dispatch, isAuthenticated]);

  // sse연결 할꺼니??!?!?!?!?sse연결 할꺼니??!?!?!?!?sse연결 할꺼니??!?!?!?!?sse연결 할꺼니??!?!?!?!?
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

        eventSource.addEventListener("SSE_START", (e) => {
          // SSE CREATED
          console.log("SSE : ", e);
        });

        eventSource.addEventListener("REQUEST", (e) => {
          // 채팅 요청 / 응답
          console.log("REQUEST", e);
          if (e.data.includes("senderId")) {
            const jsonData = JSON.parse(e.data);
            const senderId = jsonData.senderId;
            const requestTime = jsonData.requestTime;
            console.log("채팅 받음", jsonData);

            // 토스트 메시지 띄우기
            const toastContent = (
              <ToastNotification
                message="채팅 요청이 왔습니다."
                senderId={senderId}
                requestTime={requestTime}
              />
            );
            toast(toastContent, {
              position: "top-right",
              closeOnClick: true,
              draggable: false,
              autoClose: 20000,
              className: "toast-message",
            });
          }
          // 거절하기
          if (e.data === "채팅이 거절되었습니다.") {
            console.log("거절: ", e.data);
            const toastContent = <ToastNotification message={"채팅 요청이 거절되었습니다."} />;
            toast(toastContent, {
              position: "top-right",
              closeOnClick: true,
              draggable: false,
              autoClose: 3000,
              className: "toast-message",
            });
          }
        });

        // 수락하기
        eventSource.addEventListener("CHAT_START", (e) => {
          // 채팅 시작
          console.log("CHAT_START !! :", e);
          // 요청 수락
          if (e.data.includes("roomId")) {
            const jsonData = JSON.parse(e.data);
            const roomId = jsonData.roomId;
            const opponent = jsonData.opponent;
            console.log("수락roomId보냄: ", roomId);
            console.log("수락opponent보냄: ", opponent);
            dispatch(chatActions.callRoomID(roomId));
            dispatch(chatActions.updateConnectState(true));
            dispatch(chatActions.updateOpponent(opponent));
            customAxios.get(`/member/chat/info?avatarId=${opponent}`).then((res) => {
              console.log("response2", res);
              const opponentData = res.data.data;
              console.log("aaaaa", opponentData);
              dispatch(chatActions.updateURL(opponentData));
            });

            const toastContent = <ToastNotification message={"채팅 요청이 수락되었습니다."} />;
            toast(toastContent, {
              position: "top-right",
              closeOnClick: true,
              draggable: false,
              autoClose: 3000,
              className: "toast-message",
              expireFlag: "",
            });
          }
        });
      } catch (error) {
        console.log("SSE 생성 오류: ", error);
      }
    }
    // console.log("isAuthenticated이 없습니다. sse를 시도하지 않습니다.");
  };

  //보는 중이니!!?!?!?!?!?!보는 중이니!!?!?!?!?!?!보는 중이니!!?!?!?!?!?!보는 중이니!!?!?!?!?!?!
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isAuthenticated) {
        if (document.visibilityState === "visible") {
          // 앱이 포그라운드에 있을 때
          customAxios
            .post("/picker/connect", {
              point: {
                x: getPosX,
                y: getPosY,
              },
            })
            .then((e) => {
              console.log("보는중: ", e.data);
              fetchData();
            });
        } else {
          // 앱이 백그라운드에 있을 때
          customAxios.get("/picker/disconnect").then((res) => {
            console.log("안봐?!!?", res.data);
          });
        }
      }
    };

    handleVisibilityChange();

    // visibility change 이벤트 리스너 등록
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line
  }, [isAuthenticated, getPosX, getPosY, document.visibilityState]);

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
      <ToastContainer />
    </div>
  );
}
export default App;
