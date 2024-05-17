import React, { useContext } from "react";
import LatestBlogs from "../miniComponents/LatestBlogs";
import { AppContext } from "../../context/AppContext";

const Blogs = () => {
  const { mode, blogs } = useContext(AppContext);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <LatestBlogs blogs={blogs} title={"Blogs"} />
    </article>
  )
}

export default Blogs