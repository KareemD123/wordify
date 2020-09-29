import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const NavBar = (props) => {
  let nav = props.user ? (
    <div>
      <Link to="/API" className="nav-link">
        API
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to="/document" className="nav-link">
        My Documents
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to="" className="nav-link" onClick={props.handleLogout}>
        LOG OUT
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className="NavBar-welcome">Welcome, {props.user.name}</span>
    </div>
  ) : (
    <div>
      <Link to="/API" className="nav-link">
        API
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to="/document" className="nav-link">
        My Documents
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to="/login" className="nav-link">
        LOG IN
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signup" className="nav-link">
        SIGN UP
      </Link>
    </div>
  );

  return <nav className="nav-bar">{nav}</nav>;
};

export default NavBar;
