import classes from "./Picker.module.css";
import Header from "./Header";
// import FindPicker from "./FindPicker";

function Picker() {
  return (
    <div className={classes.pickerMain}>
      <Header></Header>
      {/* <FindPicker></FindPicker> */}
    </div>
  );
}
export default Picker;
