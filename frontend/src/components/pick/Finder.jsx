import classes from "./Finder.module.css";
import React, { useEffect, useState } from "react";

import RandomEmoji from "./RandomEmoji";

function Finder() {
  const [emoji, setEmoji] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmoji();
  }, []);

  const fetchEmoji = () => {
    fetch("http://localhost:8080/posts") // API 엔드포인트 URL
      .then((response) => response.json())
      //정상 응답
      .then((jsonEmoji) => {
        setEmoji(jsonEmoji.posts);
        setLoading(false);
      })
      //에러
      .catch((error) => {
        console.error("Error fetching Emoji:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className={classes.finderMain}>
        <button className={classes.button} onClick={fetchEmoji}>
          {loading ? <img src="/img/reloadBlue.png" alt="새로고침" /> : <img src="/img/bad.png" alt="새로고침" />}
          {loading ? "로딩 중" : "새로고침"}
        </button>
      </div>
      <RandomEmoji EmojiData={emoji} Loading={loading} />
    </>
  );
}

export default Finder;
