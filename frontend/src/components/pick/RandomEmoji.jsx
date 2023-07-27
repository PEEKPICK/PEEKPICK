import classes from './EmojiArea.module.css';

function RandomEmoji(props) {
  // 최대 5개까지 랜덤으로 보여주기 위해 data를 랜덤하게 섞음
  const { EmojiData } = props;

  if (EmojiData !== null) {
    // 랜덤하게 emoji 데이터 선택
    const shuffledData = [...EmojiData].sort(() => 0.5 - Math.random());
    const limitedData = shuffledData.slice(0, 5);

    return (
      // data의 길이가 1보다 큰 경우 최대 5개의 값을 나열
      <div className={classes.emojiArea}>
        {limitedData.map((limitedData) => (
          <div key={limitedData.id}>
            <span>{limitedData.author}</span>
            <span>{limitedData.body}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default RandomEmoji;
