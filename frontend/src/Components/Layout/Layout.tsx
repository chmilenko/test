import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
function Layout(): JSX.Element {
  return (
    <div>
      <Header />
      <Outlet/>
    </div>
  );
}

export default Layout;
