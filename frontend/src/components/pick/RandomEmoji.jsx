import classes from "./RandomEmoji.module.css";

function RandomEmoji({ EmojiData, Loading }) {
  if (Loading) {
    return <div>Loading...</div>;
  }

  if (EmojiData === null) {
    return <div>ÅÖ...!!!</div>;
  }

  const gridSize = 7; // °¡·Î¿Í ¼¼·Î¿¡ 10Ä­¾¿ ÃÑ 100Ä­
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
      {/* 100Ä­À¸·Î ºÐÇÒµÈ div ¾È¿¡ ·£´ýÇÑ 5°³ µ¥ÀÌÅÍ ¹èÄ¡ */}
      {Array.from({ length: gridSize * gridSize }).map((_, index) => (
        <div key={index}>
          {/* ·£´ýÇÑ 5°³ÀÇ ¼¿¿¡¸¸ limitedData.id ¹èÄ¡ */}
          {randomIndexes.includes(index) ? EmojiData[Math.floor(Math.random() * EmojiData.length)].id : null}
        </div>
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
