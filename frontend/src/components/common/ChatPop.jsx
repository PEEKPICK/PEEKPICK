import classes from "./ChatPop.module.css";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../store/chatSlice";
import { useEffect, useState } from "react";
const ChatPop = () => {
  const dispatch = useDispatch();

  const getRoomId = useSelector((state) => state.roomId.roomId);
  const getNickName = useSelector((state) => state.roomId.nickName);
  const isModalState = useSelector((state) => state.roomId.chatModalState);
  const [showChatPop, setShowChatPop] = useState(false);

  useEffect(() => {
    if (getRoomId) {
      setShowChatPop(true);
    } else {
      setShowChatPop(false); // 반대 상황일 때 애니메이션 활성화
    }
  }, [getRoomId]);
  const chatPop = () => {
    console.log("getRoomId", getRoomId);
    dispatch(chatActions.updateChatModalState(!isModalState));
  };
  return (
    <div className={`${classes.alert} ${showChatPop ? classes.show : classes.hide}`}>
      {getRoomId ? (
        <img src="img/infoRed.png" alt="" className={classes.infoPin} />
      ) : (
        <img src="img/infoBlue.png" alt="" className={classes.infoPin} />
      )}
      <span>{getNickName ? getNickName : getNickName}</span>
      <button onClick={() => chatPop()} className={classes.upBtn}>
        <img src="img/up.png" alt="" />
      </button>
    </div>
  );
};
export default ChatPop;
