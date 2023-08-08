import classes from "./Picker.module.css";
import Header from "./Header";
import FindPicker from "./FindPicker";
import ErrorBoundary from "../common/ErrorBoundary";

function Picker() {
  return (
    <div className={classes.pickerMain}>
      <ErrorBoundary>
        <Header></Header>
        <FindPicker></FindPicker>
      </ErrorBoundary>
    </div>
  );
}
export default Picker;
