import { Outlet } from "react-router-dom";
import Navi from "./Navi";

function Layout() {
  return (
    <>
      <Outlet />
      <Navi />
    </>
  );
}

export default Layout;
