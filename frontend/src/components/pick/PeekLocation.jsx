import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./PeekLocation.module.css";
import ModalCompPeek from "./ModalCompPeek";
import { customAxios } from "../../api/customAxios";
// import { findPeekActions } from "../../store/findPeekSlice";

const EmojiLocation = ({ findInfo }) => {
  const dispatch = useDispatch();
  const handleOpenPeekModal = (current, index) => {
    const peekId = current.peekId;
    document.getElementById(index).src = "https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Grey+Heart.png"


    customAxios.get(`/peek/${peekId}?distance=${current.distance}`).then((res) => {
      dispatch(modalActions.openPeekModal(res.data.data));
      // dispatch(findPeekActions.toggleViewed(peekId));
    })
    
  };

  const gridSize = 4; // 격자 크기 (4x4)
  const grid = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(false));
  const randomPosition = () => {
    let x, y;
    do {
      x = Math.floor(Math.random() * gridSize);
      y = Math.floor(Math.random() * gridSize);
    } while (grid[x][y]);

    grid[x][y] = true;

    return {
      gridColumn: `${x + 1} / ${x + 2}`,
      gridRow: `${y + 1} / ${y + 2}`,
    };
  };

  return (
    <>
      {findInfo.length > 0 ? (
        <div className={classes.emojiArea}>
          {findInfo.map((current, index) => (
            <>
            <button
              key={index}
              className={classes.EmojiBtn}
              onClick={() => handleOpenPeekModal(current, index)}
              style={randomPosition()}
              > 
              {current.viewed ? current.special ?
                <img
                  key={index}
                  src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Sparkling_Heart_grey.gif"
                  alt={current.peekId}
                  className={classes.EmojiImg}
                  id={index}
                /> : <img
                  key={index}
                  src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Grey+Heart.png"
                  alt={current.peekId}
                  className={classes.EmojiImg}
                  id={index}
                /> : current.special
                ? <img
                  key={index}
                  src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Sparkling+Heart.png"
                  alt={current.peekId}
                  className={classes.EmojiImg}
                  id={index}
                /> : <img
                  key={index}
                  src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Red+Heart.png"
                  alt={current.peekId}
                  className={classes.EmojiImg}
                  id={index}
                />



              }
            </button>
          </>
          ))}
        </div>
      ) : (
        <div className={classes.emojiArea}>텅</div>
      )}

      {/* 모달 */}

      <ModalCompPeek />
    </>
  );
};

export default EmojiLocation;
