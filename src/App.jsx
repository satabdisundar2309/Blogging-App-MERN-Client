import { useContext, useEffect, useState } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Blogs from "./components/pages/Blogs";
import SingleBlog from "./components/pages/SingleBlog";
import About from "./components/pages/About";
import AllAuthors from "./components/pages/AllAuthors";
import Dashboard from "./components/pages/Dashboard";
import UpdateBlog from "./components/pages/UpdateBlog";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  const { setUser, isAuthenticated, setIsAuthenticated, user, setBlogs } =
    useContext(AppContext);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://mern-bloggin-app-server.onrender.com/api/v1/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser({});
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Error in app.jsx fetchUser", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://mern-bloggin-app-server.onrender.com/api/v1/blogs/all",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setBlogs(data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.log("Error in app.jsx fetchBlogs", error);
      }
    };

    fetchBlogs();
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
