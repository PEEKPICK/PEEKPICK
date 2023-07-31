import classes from "./Picker.module.css";
import Header from "./Header";
import Finder from "./Finder";

function Picker() {
  return (
    <div className={classes.pickerMain}>
      <Header></Header>
      <Finder></Finder>
    </div>
  );
}
export default Picker;
