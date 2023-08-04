import classes from "./Peek.module.css";
import Header from "./Header";
import FindPeek from "./FindPeek";

function Peek() {
  return (
    <div className={classes.pickerMain}>
      <Header></Header>
      {/* <FindPeek></FindPeek> */}
    </div>
  );
}
export default Peek;
