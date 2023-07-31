import React, { useState, useEffect, useMemo, useRef } from "react";
import classes from "./Finder.module.css";
import Modal from "react-modal";
import { customAxios } from "../../api/customAxios";

//랜덤으로 이모지를 섞는 알고리즘
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomIndexes = (max, count) => {
  const indexes = Array.from({ length: max }, (_, i) => i);
  const shuffledIndexes = shuffleArray(indexes);
  return shuffledIndexes.slice(0, count);
};

function Finder() {
  console.log("렌더링");
  //이모지를 새롭게 랜더링
  const [emoji, setEmoji] = useState(null);
  //이모지 랜더링중인지 검사하기위한 상태값
  const [loading, setLoading] = useState(true);
  const randomNum = useRef(0);

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
        //이건 최초 랜덤 숫자
        randomNum.current = Math.floor(Math.random() * jsonEmoji.posts.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Emoji:", error);
        setLoading(false);
      });
  };

  // 7x7 0~48 배열에 순서대로 배정
  // post개수가 10개 => 0~48사이의 랜덤 숫자를 가진 10길이의 배열을 만듬.
  // const a = [1, 47, 35, 6, 3, 0, 13, 23, 24, 12 ...]
  // a.map

  //1. absolute 속성으로 width height 값 구하고, top: 0~(height-이모지크기) 사이의 랜덤값 중에 안겹치는 범위, left: 마찬가지.
  //2. 즉, 화면안에 들어오는 선에서 랜덤 위치에 10개 이모지 배정.
  //3. 이모지는 axios에서 받아오는 배열에서 순서대로 배정. (어차피 위치 랜덤이라 순서대로해도 노상관)
  //4. 즉 이모지 1 = ID 1, 이모지 2 = ID 2, ~ 이모지 10 = ID 10, 전부 위치는 랜덤임.
  //클릭 시, ID에 해당하는 객체를 가진 모달 띄움. 끝

  const [isModalOpen, setModalIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null); // 선택된 이모지 정보를 저장
  const [randomIndexes, setRandomIndexes] = useState(getRandomIndexes(gridSize * gridSize, 10));

  const changeRandomIndexes = () => {
    setRandomIndexes(getRandomIndexes(gridSize * gridSize, 10));
  };

  if (emoji === null) {
    return <div>텅...!!!</div>;
  }

  const gridSize = 7;
  const cellSize = `${100 / gridSize}%`;

  // const randomIndexes = useMemo(
  //   () => getRandomIndexes(gridSize * gridSize, 10),
  //   []
  // );

  // const randomEmojiGenerator = (index:) => {
  //   randomIndexes.includes(index)
  //     ? emoji[Math.floor(Math.random() * emoji.length)]
  //     : null;
  // }

  const handleEmojiButtonClick = (emoji) => {
    setSelectedEmoji(emoji); // 선택된 이모지 정보를 상태에 저장
    setModalIsOpen(true);
  };

  // 모달 닫기 콜백을 최적화를 위해 useCallback으로 감싸기
  const closeModal = () => {
    setSelectedEmoji(null); // 선택된 이모지 정보 초기화
    setModalIsOpen(false); // 모달 닫기
  };

  const [el, setEl] = useState([]);
  const [elIndex, setElIndex] = useState(0);

  useEffect(() => {
    //emoji 배열이 0이면 아무것도 없다는거니까 리턴
    if (!emoji.length) return;

    //emoji의 길이 = 6
    //arr = [0, 0, 0, 0, 0, 0].map(랜덤값)
    //결과 = [0~6사이값,0~6사이값,0~6사이값,0~6사이값,0~6사이값,0~6사이값]
    //el => [0~6,0~6,0~6,0~6,0~6,0~6]
    //emoji 길이의 랜덤숫자 배열
    setEl((el) => {
      const arr = Array.from({ length: emoji.length }, (e, i) => 0);
      return arr.map(() => emoji[Math.floor(Math.random() * arr.length)]);
    });
  }, [emoji]);

  // const randomEmoji = useMemo(
  //   () => emoji[Math.floor(Math.random() * emoji.length)],
  //   [el]
  // );

  // posts = [{id: 1, name: a},{id: 1, name: a},{id: 1, name: a},null, null,{id: 1, name: a}]
  // useState => newPost
  // newPost = Array.from({ length: gridSize * gridSize }) 0~ 48
  // newPost.map((item, index) => {
  //  return item.id
  // }) [{id: 1, name: a}, null, null, null, null, id: 1, name: a}, {id: 1, name: a}, {id: 1, name: a}]

  function renderButtons() {
    return Array.from({ length: gridSize * gridSize }).map((item, index) => {
      // const randomEmoji = useMemo(() => randomIndexes.includes(index) ? emoji[Math.floor(Math.random() * emoji.length)] : null, []);
      //randomIndexes = [1, 38, 20, 30, 11, 2, 5, 8, 10, 11]
      if (item === null) {
        return <button>HI I'm null</button>;
      } else
        return (
          <button
            key={index}
            className={classes.emojiButton}
            onClick={() => {
              changeRandomIndexes();
              // el.find(() => )
              if (randomIndexes.includes(index)) {
                handleEmojiButtonClick(emoji[randomNum.current]);
                randomNum;
              }
            }}
            disabled={!randomEmoji} // 비어있는 이모지의 경우 버튼을 비활성화
          >
            {randomIndexes.includes(index) ? item.id : null}
          </button>
        );
    });
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
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, ${cellSize})`,
        }}
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
