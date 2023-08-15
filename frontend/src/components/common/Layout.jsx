import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import classes from "./Layout.module.css";
import Header from "../pick/Header";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  const inlineStyles = {
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
    <div className={classes.layout} id="layout" style={inlineStyles}>
      {location.pathname !== "/mypage" && <Header />}
      <Outlet />
      <NavigationBar />
    </div>
  );
}

export default Layout;
