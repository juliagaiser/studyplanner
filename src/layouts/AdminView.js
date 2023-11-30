
import React from 'react';
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import {Link, Outlet} from "react-router-dom";


function AdminView() {
  return (
    
    <div className="page-container">
         <AdminNavbar />         
         <div className="content-container">                 
                <Sidebar />
                <Outlet />
         </div>         
         <Footer/>        
     </div>      
  );
}

export default AdminView;
