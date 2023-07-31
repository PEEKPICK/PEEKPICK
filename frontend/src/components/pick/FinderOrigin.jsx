import React, { useState, useEffect, useMemo } from "react";
import classes from "./Finder.module.css";
import Modal from "react-modal";
import { customAxios } from "../../api/customAxios";

function Finder() {
  console.log("렌더링");
  //이모지를 새롭게 랜더링
  const [emoji, setEmoji] = useState([]);
  //이모지 랜더링중인지 검사하기위한 상태값
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("wo렌더링");
    emojiCall();
  }, []);

  const emojiCall = () => {
    customAxios
      .get("/posts")
      .then((response) => response.data)
      .then((jsonEmoji) => {
        setEmoji(jsonEmoji.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Emoji:", error);
        setLoading(false);
      });
  };

  //랜덤으로 이모지를 섞는 알고리즘
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [isModalOpen, setModalIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null); // 선택된 이모지 정보를 저장

  const gridSize = 7;
  const cellSize = `${100 / gridSize}%`;

  const getRandomIndexes = (max, count) => {
    const indexes = Array.from({ length: max }, (_, i) => i);
    const shuffledIndexes = shuffleArray(indexes);
    return shuffledIndexes.slice(0, count);
  };

  const handleEmojiButtonClick = (emoji) => {
    setSelectedEmoji(emoji); // 선택된 이모지 정보를 상태에 저장
    setModalIsOpen(true);
  };

  // 모달 닫기 콜백을 최적화를 위해 useCallback으로 감싸기
  const closeModal = () => {
    setSelectedEmoji(null); // 선택된 이모지 정보 초기화
    setModalIsOpen(false); // 모달 닫기
  };
  const randomIndexes = useMemo(() => getRandomIndexes(gridSize * gridSize, 10), []);

  const randomEmoji = useMemo(() => emoji[Math.floor(Math.random() * emoji.length)], [emoji]);

  function renderButtons() {
    return Array.from({ length: gridSize * gridSize }).map((_, index) => {
      const randomEmoji = randomIndexes.includes(index) ? emoji[Math.floor(Math.random() * emoji.length)] : null;

      return (
        <button
          key={index}
          className={classes.emojiButton}
          onClick={() => {
            if (randomIndexes.includes(index)) {
              handleEmojiButtonClick(randomEmoji);
            }
          }}
          disabled={!randomEmoji} // 비어있는 이모지의 경우 버튼을 비활성화
        >
          {randomIndexes.includes(index) ? randomEmoji.id : null}
        </button>
      );
    });
  }

  if (emoji === null) {
    return <div>텅...!!!</div>;
  }

  return (
    <>
      <div className={classes.finderMain}>
        <button className={classes.button} onClick={emojiCall}>
          {loading ? <img src="/img/reloadBlue.png" alt="새로고침" /> : <img src="/img/bad.png" alt="새로고침" />}
          {loading ? "로딩 중" : "새로고침"}
        </button>
      </div>
      <div
        className={classes.emojiArea}
        style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, ${cellSize})` }}
      >
        {renderButtons()}
      </div>
      <Modal
        className={classes.modalMain}
        isOpen={isModalOpen}
        onRequestClose={closeModal} // 모달 닫기 콜백 사용
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div>
          <button onClick={closeModal}>X</button>
          {selectedEmoji && (
            <>
              <div>아이디: {selectedEmoji.id}</div>
              <div>내용: {selectedEmoji.body}</div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
export default Finder;
Modal.setAppElement("#root");
