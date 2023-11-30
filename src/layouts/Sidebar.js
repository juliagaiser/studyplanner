// src/Sidebar.js
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar bg-body d-flex">
      <ul className="nav sidebar-list flex-column max-margin-bottom align-items-start mb-auto">
        <li className="nav-item">
          <Link
            replace
            to="/admin/studyprograms"
            className="nav-link"
            id="btnStudiengaenge"
          >
            <i className="fs-4 bi-speedometer2 sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Studiengänge</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            replace
            to="/admin/lectures"
            className="nav-link"
            id="btnVorlesungen"
          >
            <i className="fs-4 bi-table sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Vorlesungen</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            replace
            to="/admin/lecturers"
            className="nav-link"
            id="btnDozenten"
          >
            <i className="fs-4 bi-people sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Dozenten</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            replace
            className="nav-link"
            to="/admin/lecturedates"
            id="btnVorlesungstermine"
          >
            <i className="fs-4 bi-table sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Vorlesungstermine</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            replace
            to="/admin/dashboard"
            className="nav-link"
            id="btnVorlesungstermine"
          >
            <i className="fs-4 bi-table sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            replace
            to="/admin/calender"
            className="nav-link"
            id="btnVorlesungstermine"
          >
            <i className="fs-4 bi bi-calendar2 sidebar-icon"></i>
            <span className="d-none d-lg-inline ms-2">Kalender</span>
          </Link>
        </li>
      </ul>
      <hr />
      <div className="settings">
        <div className="nav-link">
          <i className="fs-4 bi bi-tools sidebar-icon"></i>
          <span className="d-none d-lg-inline ms-2">Beispieldaten laden</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
