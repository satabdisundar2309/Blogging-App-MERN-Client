import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import toast from "react-hot-toast";
import { TfiMenu } from "react-icons/tfi";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const handleNavbar = () => {
    setShow(!show);
  };

  const isDashboard = useLocation(
    `${import.meta.env.VITE_LOCAL_URL}/dashboard`
  );
  const { mode, setMode, isAuthenticated, user, setIsAuthenticated } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async (e)=>{
      e.preventDefault();
      try {
        const response = await fetch("https://mern-bloggin-app-server.onrender.com/api/v1/user/logout", {
          method: "GET",
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`
          }
        })
        const data = await response.json()
        if(response.ok){
          toast.success(data.message);
          localStorage.removeItem("token")
          setIsAuthenticated(false)
          navigate("/login");
        }
        else{
          toast.error(data.message);
        }
      } catch (error) {
        console.log("Error in navbar logout", error)
      }
  }

  return (
    <>
      <section
        className={
          isDashboard.pathname === "/dashboard"
            ? "hideNavbar"
            : mode === "light"
            ? "header light-navbar"
            : "header dark-navbar"
        }
      >
        <nav>
          <div className="logo">
            <img src="/BlogsLogo.png" alt="LOGO" width={180} />
          </div>
          <div className={show ? "links show" : "links"}>
            <ul>
              <li>
                <NavLink to={"/"} onClick={handleNavbar}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/blogs"} onClick={handleNavbar}>
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink to={"/authors"} onClick={handleNavbar}>
                  All Authors
                </NavLink>
              </li>
              <li>
                <NavLink to={"/about"} onClick={handleNavbar}>
                  About
                </NavLink>
              </li>
            </ul>
            <div className="btns">
              <button
                onClick={() =>
                  mode === "light" ? setMode("dark") : setMode("light")
                }
                className={
                  mode === "light"
                    ? "mode-btn light-mode"
                    : "mode-btn dark-mode"
                }
              >
                {mode === "light" ? (
                  <CiLight className="light-icon" />
                ) : (
                  <MdDarkMode className="dark-icon" />
                )}
              </button>

              {isAuthenticated && user.role === "Author" ? (
                <NavLink
                  to={"/dashboard"}
                  onClick={handleNavbar}
                  className="dashboard-btn"
                >
                  Dashboard
                </NavLink>
              ) : (
                ""
              )}

              {!isAuthenticated ? (
                <NavLink
                  to={"/login"}
                  onClick={handleNavbar}
                  className="login-btn"
                >
                  Login
                </NavLink>
              ) : (
                <div>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
          {show ? (
            <FaXmark className="hamburger" onClick={handleNavbar} />
          ) : (
            <TfiMenu className="hamburger" onClick={handleNavbar} />
          )}
        </nav>
      </section>
    </>
  );
};

export default Navbar;
