import classes from "./Peek.module.css";
import Header from "./Header";
import FindPeek from "./FindPeek";
import ErrorBoundary from "../common/ErrorBoundary";

function Peek() {
  return (
    <div className={classes.pickerMain}>
      <ErrorBoundary>
        <Header></Header>
        <FindPeek></FindPeek>
      </ErrorBoundary>
    </div>
  );
}
export default Peek;
