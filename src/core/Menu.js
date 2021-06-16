import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ffffff" };
  } else {
    return;
  }
};

const Menu = ({ history }) => (
  <nav className="bg-gray-800">
    <div className="container flex ">
      {/* all category */}
      <div className="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
        <span className="text-white">
          <i className="fas fa-bars"></i>
        </span>
        <span className="capitalize ml-2 text-white">All Categories</span>
      </div>
      {/* all category ends*/}
      {/* navbar links */}
      <div className="flex items-center justify-between flex-grow pl-12">
        <div className="flex items-center space-x-6 capitalize">
          <Link
            className="text-gray-300 hover:text-white transition"
            to="/"
            style={isActive(history, "/")}
          >
            Home
          </Link>
          <Link
            className="text-gray-300 hover:text-white transition"
            to="/signin"
            style={isActive(history, "/signin")}
          >
            Signin
          </Link>
          <Link
            className="text-gray-300 hover:text-white transition"
            to="/signup"
            style={isActive(history, "/signup")}
          >
            Register
          </Link>
        </div>
      </div>
      {/* navbar links ends */}
    </div>
  </nav>
);

export default withRouter(Menu);
