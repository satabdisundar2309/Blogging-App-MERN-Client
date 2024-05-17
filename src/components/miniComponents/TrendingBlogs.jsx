import React, { useContext } from 'react'
import {AppContext} from '../../context/AppContext'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BeatLoader } from "react-spinners";
import { NavLink } from "react-router-dom";

const TrendingBlogs = () => {

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 4, 
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 3, 
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 2, 
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const { blogs } = useContext(AppContext);
  return (
    <div className="trending">
    <h3>Trending</h3>
    <Carousel responsive={responsive}>
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 6).map((element) => {
          return (
            <NavLink className="card" key={element._id}>
              <img
                src={element.mainImage.url}
                alt="blog"
                className="blogImg"
              />
              <span className="category">{element.category}</span>
              <h4>{element.title}</h4>
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
        <BeatLoader size={30} color="gray" />
      )}
    </Carousel>
  </div>
  )
}

export default TrendingBlogs