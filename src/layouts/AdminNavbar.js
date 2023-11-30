
import React from 'react';
import UniplanerLogo from './assets/uniplaner_logo.JPG'

function AdminNavbar(props) {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom py-3">
      <div className="container-fluid">
        
        <a className="navbar-brand ms-4" href="#">           
           <img className="navlogo" src={UniplanerLogo} alt="Logo" height="24" />            
        </a>
        
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

export default AdminNavbar;

