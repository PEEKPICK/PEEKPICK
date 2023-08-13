import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./PickLocation.module.css";
import ModalCompPick from "./ModalCompPick";

const EmojiLocation = ({ findInfo }) => {
  const dispatch = useDispatch();

  const handleOpenPickModal = (current) => {
    dispatch(modalActions.openPickModal(current));
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
            <button
              key={index}
              className={classes.EmojiBtn}
              onClick={() => handleOpenPickModal(current)}
              style={randomPosition()}
            >
              <img
                key={index}
                src={current.emoji.animatedImageUrl}
                alt={current.emoji.emojiId}
                className={classes.EmojiImg}
              />
            </button>
          ))}
        </div>
      ) : (
        <div>사용자가 없어요!</div>
      )}
      {/* 모달 */}
      <ModalCompPick findInfo={findInfo} />
    </>
  );
};

export default EmojiLocation;
