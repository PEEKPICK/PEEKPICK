import Header from "./Header";
import Finder from "./Finder";

// CSS
import classes from "./Picky.module.css";

function Picky() {
  return (
    <div className={classes.pickyMain}>
      <Header></Header>
      <Finder></Finder>
    </div>
  );
}
export default Picky;
