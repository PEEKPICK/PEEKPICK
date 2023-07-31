import React, { useState } from "react";
import classes from "./RandomEmoji.module.css";
import Modal from "react-modal";

function RandomEmoji({ EmojiData }) {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null); // 선택된 이모지 정보를 저장

  if (EmojiData === null) {
    return <div>텅...!!!</div>;
  }

  const gridSize = 7;
  const cellSize = `${100 / gridSize}%`;

  const getRandomIndexes = (max, count) => {
    const indexes = Array.from({ length: max }, (_, i) => i);
    const shuffledIndexes = shuffleArray(indexes);
    return shuffledIndexes.slice(0, count);
  };

  const randomIndexes = getRandomIndexes(gridSize * gridSize, 10);

  const handleEmojiButtonClick = (emoji) => {
    setSelectedEmoji(emoji); // 선택된 이모지 정보를 상태에 저장
    setModalIsOpen(true);
  };

  return (
    <div
      className={classes.emojiArea}
      style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, ${cellSize})` }}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, index) => {
        const randomEmoji = randomIndexes.includes(index)
          ? EmojiData[Math.floor(Math.random() * EmojiData.length)]
          : null;

        return (
          <button
            key={index}
            className={classes.emojiButton}
            onClick={() => handleEmojiButtonClick(randomEmoji)}
            disabled={!randomEmoji} // 비어있는 이모지의 경우 버튼을 비활성화
          >
            {randomEmoji && randomEmoji.id}
          </button>
        );
      })}
      <Modal
        className={classes.modalMain}
        isOpen={isModalOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div>
          <button onClick={() => setModalIsOpen(false)}>X</button>
          {selectedEmoji && (
            <>
              <div>아이디: {selectedEmoji.id}</div>
              <div>내용: {selectedEmoji.body}</div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default RandomEmoji;

Modal.setAppElement("#root");
