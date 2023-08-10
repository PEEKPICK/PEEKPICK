import classes from './style/Branding.module.css';

const Branding = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>PEEK PICK이란?</h1>
        <div className={classes.line}></div>
      </div>
      <div className={classes.content}>
        <div className={classes.emoji}>
          <div className={classes.item}>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Stopwatch.png"
              alt="Stopwatch"
              width="75"
              height="75"
              id='1'
            />
            <p>휘발성</p>
          </div>
          <div className={classes.item}>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Bust%20in%20Silhouette.png"
              alt="Bust in Silhouette"
              width="75"
              height="75"
              id='2'
            />
            <p>익명성</p>
          </div>
          <div className={classes.item}>
            <img  
              src="https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Thumbs.png"
              alt="Thumbs"
              width="75"
              height="75"
              id='3'
            />
            <p>취향</p>
          </div>
          <div className={classes.item}>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Compass.png"
              alt="Compass"
              width="75"
              height="75"
              id='4'
            />
            <p>위치 기반</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branding;