import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const NavBar = (props) => {
  let nav = props.user ? (
    <div className="nav-header">
      <span className="title">Wordify</span>
      <span className="welcome">Welcome, {props.user.name}.</span>
      <Link to="/" className="nav-link">
        <span className="nav-item">My Vocabulary List</span>
      </Link>
      <Link to="/API" className="nav-link">
        <span className="nav-item">Search</span>
      </Link>
      <Link to="/document" className="nav-link">
        <span className="nav-item">Submit</span>
      </Link>
      <Link to="" onClick={props.handleLogout} className="nav-link">
        <span className="nav-item">Log out</span>
      </Link>
    </div>
  ) : (
    <div className="nav-header">
      <span className="title">Wordify</span>
      <Link to="/API" className="nav-link">
        <span className="nav-item">Search</span>
      </Link>
      <Link to="/document" className="nav-link">
        <span className="nav-item">Submit</span>
      </Link>
      <Link to="/login" className="nav-link">
        <span className="nav-item">Log in</span>
      </Link>
      <Link to="/signup" className="nav-link">
        <span className="nav-item">Sign up</span>
      </Link>
    </div>
  );

  return <nav className="app-header">{nav}</nav>;
};

export default NavBar;

// NavBar for horizontal nav display
// const NavBar = (props) => {
//   let nav = props.user ? (
//     <div className="headline">
//       <span className="title">Wordify</span>
//       <h3 className="NavBar-welcome">Welcome, {props.user.name}</h3>
//       <div className="nav-bar">
//         <Link to="/API" className="nav-item">
//           API
//         </Link>
//         &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
//         <Link to="/document" className="nav-item">
//           My Documents
//         </Link>
//         &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
//         <Link to=""  onClick={props.handleLogout} className="nav-item">
//           LOG OUT
//         </Link>
//         &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
//       </div>
//     </div>
//   ) : (
//     <div className="headline">
//       <span className="title">Wordify</span>
//       <div className="nav-bar">
//         <Link to="/API" className="nav-item">
//           API
//         </Link>
//         &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
//         <Link to="/document" className="nav-item">
//           My Documents
//         </Link>
//         &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
//         <Link to="/login" className="nav-item">
//           LOG IN
//         </Link>
//         &nbsp;&nbsp;|&nbsp;&nbsp;
//         <Link to="/signup" className="nav-item">
//           SIGN UP
//         </Link>
//       </div>
//     </div>
//   );
