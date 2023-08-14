import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import classes from "./Layout.module.css";
import Header from "../pick/Header";
import {useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  

  return (
    <div className={classes.layout}>
      {location.pathname !== '/mypage' &&  <Header/>}
      <Outlet />
      <NavigationBar />
    </div>
  );
}

export default Layout;
