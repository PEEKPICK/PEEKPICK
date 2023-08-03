import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import classes from "./EmojiLocation.module.css";
import ModalComp from "./ModalComp";

const EmojiLocation = ({ nearByUser }) => {
  const dispatch = useDispatch();

  const handleOpenModal = (current) => {
    dispatch(modalActions.openModal(current));
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
        {nearByUser.map((current, index) => (
          <button
            key={index}
            className={classes.EmojiBtn}
            onClick={() => handleOpenModal(current)}
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
      {/* 모달 */}
      <ModalComp />
    </>
  );
};

export default EmojiLocation;
