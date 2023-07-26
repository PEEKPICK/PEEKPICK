import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import classes from "./Layout.module.css";
function Layout() {
  return (
    <div className={classes.layout}>
      <Outlet />
      <NavigationBar />
    </div>
  );
}

export default Layout;
