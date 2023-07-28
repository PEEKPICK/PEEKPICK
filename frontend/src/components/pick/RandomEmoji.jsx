import { useState } from "react";
import classes from "./RandomEmoji.module.css";
import emojiModal from "./emojiModal";
function RandomEmoji({ EmojiData }) {
  //이모지 모달 창 상태
  if (EmojiData === null) {
    return <div>텅...!!!</div>;
  }

  const gridSize = 7; // 가로와 세로에 10칸씩 총 100칸
  const cellSize = `${100 / gridSize}%`;

  const getRandomIndexes = (max, count) => {
    const indexes = Array.from({ length: max }, (_, i) => i);
    const shuffledIndexes = shuffleArray(indexes);
    return shuffledIndexes.slice(0, count);
  };

  const randomIndexes = getRandomIndexes(gridSize * gridSize, 10);

  return (
    <div
      className={classes.emojiArea}
      style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, ${cellSize})` }}
    >
      {/* 100칸으로 분할된 div 안에 랜덤한 5개 데이터 배치 */}
      {Array.from({ length: gridSize * gridSize }).map((_, index) => (
        <button key={index} className={classes.emojiButton}>
          {/* 랜덤한 5개의 셀에만 limitedData.id 배치 */}
          {randomIndexes.includes(index) ? EmojiData[Math.floor(Math.random() * EmojiData.length)].id : null}
        </button>
      ))}
    </div>
  );
}
// Fisher-Yates (Knuth) Shufflem
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
export default RandomEmoji;
