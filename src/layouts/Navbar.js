
import React from 'react';
import UniplanerLogo from './assets/uniplaner_logo.JPG'

function Navbar(props) {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom py-3">
      <div className="container">

        <a className="navbar-brand" href="#">

          <img className="navlogo" src={UniplanerLogo} alt="Logo" height="24" />
        </a>

        {/* Navbar toggler button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/homepage">Text view</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/admin">Planen</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Impressum">Impressum</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

