import React, { useCallback, useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAxios } from "../../api/customAxios";
import classes from "./FindPicker.module.css";
import { findPeekActions } from "../../store/findPeekSlice";
import PeekLocation from "./PeekLocation";
import ModalWrite from "./ModalWrite";
const FindPeek = () => {
  const dispatch = useDispatch();
  //주변 유져 정보
  const myPos = useSelector((state) => state.location.userPos);
  const findInfo = useSelector((state) => state.findPeek.peekInfomation);
  const [check,setCheck] = useState(false);
  const emojiCall = useCallback(() => {
    customAxios.post("/peek", myPos).then((response) => {
      // console.log("PEEK", response);
      const peekArrayOrigin = response.data.data;
      if (Array.isArray(peekArrayOrigin)) {
        // 최대 n개의 이모지만 보여주기
        const maxEmojisToShow = 8;
        //정보 저장
        const limitedUserArray = peekArrayOrigin.slice(0, maxEmojisToShow);
        // console.log("넘어온 limitedUserArray: ", limitedUserArray);
        dispatch(findPeekActions.updatePeekInfo(limitedUserArray));
      }
    });
  }, [myPos, dispatch]);

    //글작성 상태관리
    const [write, setWrite] = useState(false);
    //글작성 버튼 온
    const modalWriteOnOff =()=>{
      setWrite(!write);
    }

  useEffect(() => {
    // 2초 딜레이 후에 emojiCall 함수 호출

    const timeout = setTimeout(() => {
      emojiCall(myPos);
    }, 1000);

    // cleanup 함수에서 timeout 해제
    return () => {
      if(write===false){
        clearTimeout(timeout);
      }
    };
  }, [myPos, emojiCall,write,check]);

  return (
    <>
      <div className={classes.ParentreloadBtn}>
        {/* 버튼 클릭 시 handleEmojiCall 함수를 호출 */}
        <button className={classes.reloadBtn} onClick={() => emojiCall(myPos)}>
          <img src="./img/reloadBlue.png" alt="새로고침" />
          새로고침
        </button>
      </div>
      <PeekLocation findInfo={findInfo} setCheck={setCheck} check={check}/>
      {/* 여기다가 글쓰기 만들장 */}
      <div className={classes.writeposition}>
      <img src="img/writeimg.png" alt="눌러" onClick={modalWriteOnOff}/>
      </div>
      {<ModalWrite setWrite={setWrite} write={write}/>}
    </>
  );
};

export default FindPeek;
