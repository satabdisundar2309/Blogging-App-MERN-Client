import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { BeatLoader } from "react-spinners";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  const { blogs } = useContext(AppContext);
  return (
    <section className="hero">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 2).map((element) => {
          return (
            <NavLink
              to={`/blog/${element._id}`}
              style={{ cursor: "pointer" }}
              className="card"
              key={element._id}
            >
              <img src={element.mainImage.url} alt="blog" className="blogImg" />
              <div className="category">{element.category}</div>
              <h1>{element.title}</h1>
              <div className="writer_section">
                <div className="author">
                  <img src={element.authorAvatar} alt="author_avatar" />
                  <p>{element.authorName}</p>
                </div>
              </div>
            </NavLink>
          );
        })
      ) : (
        <BeatLoader color="gray" size={30} />
      )}
    </section>
  );
};

export default HeroSection;
