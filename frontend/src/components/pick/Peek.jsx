import classes from "./Peek.module.css";
// import Header from "./Header";
import FindPeek from "./FindPeek";
import React from "react";

function Peek() {
  // const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const inlineStyles = {
    // backgroundImage: `url("/img/maps/BigBenBack.png")`,
    // backgroundImage: `url("/img/maps/EiffelTowerBack.png")`,
    // backgroundImage: `url("/img/maps/KermlinBack.png")`,
    // backgroundImage: `url("/img/maps/PiramidsBack.png")`,
    // backgroundImage: `url("/img/maps/PisaTowerBack.png")`,
    backgroundImage: `url("/img/maps/StatueLibertyBack.png")`,
    // backgroundImage: `url("/img/maps/TajimahalBack.png")`,
    // backgroundImage: `url("/img/free.png")`,
  };
  return (
    <div className={classes.pickerMain} id="peekMain" style={inlineStyles}>
      {/* <Header></Header> */}
      <FindPeek></FindPeek>
    </div>
  );
}
export default Peek;
