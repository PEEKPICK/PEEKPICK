import classes from "./Finder.module.css";

function Finder() {
  return (
    <div className={classes.finderMain}>
      <button className={classes.button}>
        <img src="/img/reloadBlue.png" alt="새로고침" />
        피커찾기
      </button>
    </div>
  );
}

export default Finder;
