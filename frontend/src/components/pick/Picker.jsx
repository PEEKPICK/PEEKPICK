import React from "react";
import classes from "./Picker.module.css";
// import Header from "./Header";
import FindPicker from "./FindPicker";

function Picker() {
  // const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const inlineStyles = {
    // backgroundImage: `url("/img/maps/BigBen.png")`,
    backgroundImage: `url("/img/maps/StatueLiberty.png")`,
    // backgroundImage: `url("/img/free.png")`,
  };

  return (
    <div className={classes.pickerMain} style={inlineStyles}>
      {/* <Header></Header> */}
      <FindPicker></FindPicker>
    </div>
  );
}
export default Picker;
