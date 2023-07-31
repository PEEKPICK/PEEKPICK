import classes from "./Header.module.css";

function Header() {
  return (
    <div className={classes.headerMain}>
      <button className={classes.button}>
        <img src="/img/distance.png" alt="거리조절버튼" />
      </button>
      <button className={classes.button}>
        <img src="/img/aram.png" alt="거리조절버튼" />
      </button>
    </div>
  );
}

export default Header;
