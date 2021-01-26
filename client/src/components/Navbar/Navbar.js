import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import { NavContainer } from "./Navbar.styles";
import { connect } from "react-redux";

function Navbar(props) {
  let [isOpen, setIsOpen] = useState(false);
  let toggleSidebar = () => setIsOpen(!isOpen);

  let renderProfile = () => {
    if (props.user) {
      return (
        <div className="profile">
          <img
            className="profile-image"
            src={`/img/users/${props.user.photo}`}
            alt={props.user.name}
          />
        </div>
      );
    }
  };

  let renderNavLinks = () => {
    if (props.user) {
      return (
        <>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => setIsOpen(false)}
              href="/api/v1/users/logout"
            >
              Logout
            </a>
          </li>
          <li className="nav-item">
            <Link onClick={() => setIsOpen(false)} to="/dashboard">
              {renderProfile()}
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={() => setIsOpen(false)}
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={() => setIsOpen(false)}
              to="/login"
            >
              Login
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <NavContainer isOpen={isOpen}>
      <Hamburger isOpen={isOpen} handleClick={toggleSidebar} />
      <ul className="nav-list">
        <li className="nav-item right-nav">
          <Link className="nav-link" onClick={() => setIsOpen(false)} to="/">
            All Tours
          </Link>
        </li>
        {renderNavLinks()}
      </ul>
    </NavContainer>
  );
}

let mapStateToProps = (state) => {
  return {
    user: state.authState.user,
  };
};

export default connect(mapStateToProps)(Navbar);
