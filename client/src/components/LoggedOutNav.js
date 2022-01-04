import React from "react";
import {Link} from "react-router-dom";
import holdmybeerlogo from "../images/holdmybeerlogops.png";

const LoggedOutNav = () => {
  return (
    <div>
      <nav
        style={{ marginBottom: 20 }}
        className="navbar navbar-expand-lg navbar-dark bg-primary"
      >
        <Link style={{ marginLeft: 20 }} className="navbar-brand" to="/">
          Hold My Beer
          <img
            style={{ marginLeft: 8, height: 35 }}
            src={holdmybeerlogo}
            alt="beer"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/videos">
                Videos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default LoggedOutNav;
