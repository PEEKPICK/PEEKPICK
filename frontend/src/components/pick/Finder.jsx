import classes from './Finder.module.css';
import React, { useEffect, useState } from 'react';

import RandomEmoji from './RandomEmoji';

function Finder() {
  const [emoji, setEmoji] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmoji();
  }, []);

  const fetchEmoji = () => {
    setLoading(true);
    fetch('http://localhost:8080/posts') // API 엔드포인트 URL
      .then(
        (response) =>
          new Promise((resolve) =>
            setTimeout(() => resolve(response.json()), 500)
          )
      )
      //정상 응답
      .then((jsonEmoji) => {
        setEmoji(jsonEmoji.posts);
        setLoading(false);
      })
      //에러
      .catch((error) => {
        console.error('Error fetching Emoji:', error);
        setLoading(false);
      });
  };

  const refreshHandler = () => {
    fetchEmoji();
  };

  return (
    <>
      <div className={classes.finderMain}>
        <button className={classes.button} onClick={refreshHandler}>
          <img src="/img/reloadBlue.png" alt="새로고침" />
          피커찾기
        </button>
      </div>
      <RandomEmoji EmojiData={emoji} Loading={loading} />
    </>
  );
}

export default Finder;
