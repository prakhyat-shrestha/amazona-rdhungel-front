import React from "react";
import Menu from "./Menu";
import Header from "./Header";

const Layout = ({ className, children }) => (
  <div>
    <Header />
    <Menu />
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
