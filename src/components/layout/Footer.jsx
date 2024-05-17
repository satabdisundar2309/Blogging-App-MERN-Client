import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { NavLink, useLocation } from 'react-router-dom';

const Footer = () => {

  const isDashboard = useLocation(
    `${import.meta.env.VITE_LOCAL_URL}/dashboard`
  );
  const { mode, setMode } = useContext(AppContext);
  
  return (
    <footer
    className={
      isDashboard.pathname === "/dashboard"
        ? "hideFooter"
        : mode === "light"
        ? "light-footer"
        : "dark-footer"
    }
  >
    <div className="container">
      <div className="about">
        <h3>About</h3>
        <p>
          This is a MERN stack blogging app created by Satabdisundar Subijaya Behera
        </p>
      </div>
      <div className="quick_links">
        <h3>Quick Links</h3>
        <ul>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/blogs"}>Blogs</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </ul>
      </div>
      <div className="categories">
        <h3>Categories</h3>
        <ul>
          <li>Technology</li>
          <li>Sports</li>
          <li>Travel</li>
          <li>Business</li>
        </ul>
      </div>
    </div>
    <div className="container">
      <div className="logo"><img src="/BlogsLogo.png" alt="LOGO" width={180} /></div>
      <div className="links">
       <p style={{color: 'white'}}>Satabdisundar Behera &copy; 2024</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer