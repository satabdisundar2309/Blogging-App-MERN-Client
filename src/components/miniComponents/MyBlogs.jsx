import React, { useEffect, useState } from "react";
import LatestBlogs from "./LatestBlogs";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await fetch(
          "https://mern-bloggin-app-server.onrender.com/api/v1/blogs/myblogs",
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMyBlogs(data.blogs);
        }
      } catch (error) {
        console.log("Error in fetch my blogs myBlogs", error);
      }
    };
    fetchMyBlogs();
  }, []);

  const deleteBlogHandler = async (id) => {
    try {
      const response = await fetch(
        `https://mern-bloggin-app-server.onrender.com/api/v1/blogs/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetch my blogs myBlogs", error);
    }
  };

  return (
    <>
      <section className="my-blogs">
        {myBlogs && myBlogs.length > 0
          ? myBlogs.map((element) => {
              return (
                <div className="author-blog-card" key={element._id}>
                  {element.mainImage && element.mainImage && (
                    <img src={element.mainImage.url} alt="blogImg" />
                  )}
                  <span className="category">{element.category}</span>
                  <h4>{element.title}</h4>
                  <div className="btn-wrapper">
                    <NavLink
                      to={`/blog/update/${element._id}`}
                      className="update-btn"
                    >
                      Update
                    </NavLink>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBlogHandler(element._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          : "You have not posted any blog!"}
      </section>
    </>
  );
};

export default MyBlogs;
