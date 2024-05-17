import React, { useContext, useState } from "react";
import SideBar from "../layout/Sidebar";
import MyBlogs from "../miniComponents/MyBlogs";
import MyProfile from "../miniComponents/MyProfile";
import CreateBlog from "../miniComponents/CreateBlog";
import { AppContext } from "../../context/AppContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const { mode, user, isAuthenticated } = useContext(AppContext);

  if (!isAuthenticated || user.role === "Reader") {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SideBar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;
