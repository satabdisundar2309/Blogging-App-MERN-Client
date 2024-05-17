import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Navigate, useParams } from "react-router-dom";

const SingleBlog = () => {
  const { mode, user, isAuthenticated } = useContext(AppContext);
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const response = await fetch(
          `https://mern-bloggin-app-server.onrender.com/api/v1/blogs/singleblog/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setBlog(data.blog);
        } else {
          setBlog({});
        }
      } catch (error) {
        console.log("Error in single blog page getSingleBlog ", error);
      }
    };
    getSingleBlog();
  }, []);
  return (
    <article
      className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}
    >
      {blog && (
        <section className="container">
          <div className="category">{blog.category}</div>
          <h1>{blog.title}</h1>
          <div className="writer_section">
            <div className="author">
              <img src={blog.authorAvatar} alt="author_avatar" />
              <p>{blog.authorName}</p>
            </div>
          </div>
          {blog && blog.mainImage && (
            <img
              src={blog.mainImage.url}
              alt="mainBlogImg"
              className="mainImg"
            />
          )}
          <p className="intro-text">{blog.intro}</p>
          <div className="sub-para">
            {blog && blog.paraOneTitle && <h3>{blog.paraOneTitle}</h3>}

            {blog && blog.paraOneImage && (
              <img src={blog.paraOneImage.url} alt="paraOneImg" />
            )}

            {blog && blog.paraOneDescription && (
              <p>{blog.paraOneDescription}</p>
            )}
          </div>
          <div className="sub-para">
            {blog && blog.paraTwoTitle && <h3>{blog.paraTwoTitle}</h3>}

            {blog && blog.paraTwoImage && (
              <img src={blog.paraTwoImage.url} alt="paraTwoImg" />
            )}

            {blog && blog.paraTwoDescription && (
              <p>{blog.paraTwoDescription}</p>
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default SingleBlog;
