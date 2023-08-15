import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import classes from "./Layout.module.css";
import Header from "../pick/Header";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Layout() {
  const location = useLocation();
  const getWorldId = useSelector((state) => state.changeMap.worldId);
  const [worldId, setWorldId] = useState();
  const [isValidWorldId, setIsValidWorldId] = useState(false);

  useEffect(() => {
    setWorldId(getWorldId);
    // console.log("getWorldId", getWorldId);
  }, [getWorldId]);

  const backgroundColors = ["#63b3ff", "#af8e88", "#e9b36a", "#81b249", "#a7a49a", "#3f504f", "#c9bdb2"];

  useEffect(() => {
    if (worldId >= 1 && worldId <= backgroundColors.length) {
      setIsValidWorldId(true);
    } else {
      setIsValidWorldId(false);
    }
    // eslint-disable-next-line
  }, [worldId]); // worldId가 변경될 때마다 useEffect 실행

  const layoutStyle = {
    backgroundColor: isValidWorldId ? backgroundColors[worldId - 1] : backgroundColors[0],
  };
  return (
    <div className={classes.layout} id="layout" style={layoutStyle}>
      {location.pathname !== "/mypage" && <Header />}
      <Outlet />
      <NavigationBar />
    </div>
  );
}

export default Layout;
