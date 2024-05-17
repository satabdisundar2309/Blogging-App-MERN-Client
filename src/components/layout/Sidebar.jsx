import React, { useContext, useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { FaXmark } from "react-icons/fa6";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Sidebar = ({ setComponent }) => {
  const [show, setShow] = useState(false);
  const { mode, setMode, setIsAuthenticated, user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://mern-bloggin-app-server.onrender.com/api/v1/user/logout", {
        method: "GET",
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in sidebar logout", error);
    }
  };

  const handleComponent = (value) => {
    setComponent(value);
  };

  const gotoHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="icon-wrapper" onClick={() => setShow(!show)}>
        <TfiMenu/>
      </div>
      <section className={show ? "show-sidebar sidebar" : "sidebar"}>
        <div className="icon-wrapper-arrow" onClick={() => setShow(!show)}>
          <FaXmark/>
        </div>
        <div className="user-detail">
          <img src={user && user.avatar.url} alt="avatar" />
          <p>{user.name}</p>
        </div>
        <ul>
          <button onClick={() => handleComponent("My Blogs")}>My Blogs</button>
          <button onClick={() => handleComponent("Create Blog")}>
            Create Blog
          </button>
          <button onClick={() => handleComponent("My Profile")}>
            My Profile
          </button>
          <button onClick={gotoHome}>Home</button>
          <button onClick={handleLogout}>Logout</button>
          <button
            onClick={() =>
              mode === "light" ? setMode("dark") : setMode("light")
            }
            className={
              mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
            }
          >
            {mode === "light" ? (
              <CiLight className="light-icon" />
            ) : (
              <MdDarkMode className="dark-icon" />
            )}
          </button>
        </ul>
      </section>
    </>
  );
};

export default Sidebar;
