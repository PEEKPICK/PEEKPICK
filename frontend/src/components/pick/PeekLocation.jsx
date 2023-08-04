import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./PeekLocation.module.css";
import ModalCompPeek from "./ModalCompPeek";

const EmojiLocation = ({ findInfo }) => {
  // console.log(findInfo);
  const dispatch = useDispatch();

  const handleOpenPeekModal = (current) => {
    dispatch(modalActions.openPeekModal(current));
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
      <div className={classes.emojiArea}>
        {findInfo.map((current, index) => (
          <button
            key={index}
            className={classes.EmojiBtn}
            onClick={() => handleOpenPeekModal(current)}
            style={randomPosition()}
          >
            {current.viewed ? (
              <img
                key={index}
                src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Heart+Exclamation.png"
                alt={current.peekId}
                className={classes.EmojiImg}
              />
            ) : (
              <img
                key={index}
                src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Speech+Balloon.png"
                alt={current.peekId}
                className={classes.EmojiImg}
              />
            )}
          </button>
        ))}
      </div>

      {/* 모달 */}
      <ModalCompPeek findInfo={findInfo} />
    </>
  );
};

export default EmojiLocation;
