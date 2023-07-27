import classes from "./RandomEmoji.module.css";

function RandomEmoji({ EmojiData, Loading }) {
  if (Loading) {
    return <div>Loading...</div>;
  }

  if (EmojiData === null) {
    return <div>No emoji data available.</div>;
  }

  const shuffledData = [...EmojiData].sort(() => 1.0 - Math.random());
  const limitedData = shuffledData.slice(0, 10);

  const gridSize = 10; // 가로와 세로에 10칸씩 총 100칸
  const cellSize = `${100 / gridSize}%`;

  const getRandomIndexes = (max, count) => {
    const indexes = Array.from({ length: max }, (_, i) => i);
    const shuffledIndexes = indexes.sort(() => 0.5 - Math.random());
    return shuffledIndexes.slice(0, count);
  };

  const randomIndexes = getRandomIndexes(gridSize * gridSize, 5);

  return (
    <div
      className={classes.emojiArea}
      style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, ${cellSize})` }}
    >
      {/* 100칸으로 분할된 div 안에 랜덤한 5개 데이터 배치 */}
      {Array.from({ length: gridSize * gridSize }).map((_, index) => (
        <div key={index}>
          {/* 랜덤한 5개의 셀에만 limitedData.id 배치 */}
          {randomIndexes.includes(index) ? limitedData[Math.floor(Math.random() * limitedData.length)].id : null}
        </div>
      ))}
    </div>
  );
}

export default RandomEmoji;
