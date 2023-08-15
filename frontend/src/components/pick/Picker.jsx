import React from "react";
import classes from "./Picker.module.css";
// import Header from "./Header";
import FindPicker from "./FindPicker";

function Picker() {
  // const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const inlineStyles = {
    // backgroundImage: `url("/img/maps/BigBenBack.png")`,
    // backgroundImage: `url("/img/maps/EiffelTowerBack.png")`,
    // backgroundImage: `url("/img/maps/KermlinBack.png")`,
    // backgroundImage: `url("/img/maps/PiramidsBack.png")`,
    // backgroundImage: `url("/img/maps/PisaTowerBack.png")`,
    // backgroundImage: `url("/img/maps/StatueLibertyBack.png")`,
    backgroundImage: `url("/img/maps/TajimahalBack.png")`,
    // backgroundColor: `#3f504f`,
    // backgroundColor: `#c9bdb2`,
    // backgroundColor: `#a7a49a`,
    // backgroundColor: `#e9b36a`,
    // backgroundColor: `#81b249`,
    // backgroundColor: `#63b3ff`,
    backgroundColor: `#af8e88`,
    // backgroundImage: `url("/img/free.png")`,
  };

  return (
    <div className={classes.pickerMain} id="pickerMain" style={inlineStyles}>
      {/* <Header></Header> */}
      <FindPicker></FindPicker>
    </div>
  );
}
export default Picker;
