import React, { useContext } from 'react'
import {AppContext} from "../../context/AppContext"
import HeroSection from '../miniComponents/HeroSection'
import TrendingBlogs from '../miniComponents/TrendingBlogs'
import LatestBlogs from '../miniComponents/LatestBlogs'
import PopularAuthors from '../miniComponents/PopularAuthors'

const Home = () => {

  const { mode, blogs } = useContext(AppContext);
  const filteredBlogs = blogs.slice(0, 6);
  return (
    <>
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <HeroSection />
      <TrendingBlogs />
      <LatestBlogs heading={"Latest Blogs"} blogs={filteredBlogs} />
      <PopularAuthors />
    </article>
  </>
  )
}

export default Home