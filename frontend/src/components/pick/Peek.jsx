import classes from "./Peek.module.css";
import Header from "./Header";
import FindPeek from "./FindPeek";
import React, { useState } from "react";

function Peek() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const inlineStyles = {
    backgroundImage: `url("/img/maps/BigBen.png")`,
  };
  return (
    <div className={classes.pickerMain} style={inlineStyles}>
      <Header></Header>
      <FindPeek></FindPeek>
    </div>
  );
}
export default Peek;
