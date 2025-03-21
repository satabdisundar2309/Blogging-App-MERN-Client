import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { BeatLoader, BounceLoader } from "react-spinners";

const AllAuthors = () => {

  const [authors, setAuthors] = useState([]);
  const { mode } = useContext(AppContext);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("https://mern-bloggin-app-server.onrender.com/api/v1/user/authors",{
          method: "GET"
        })
        const data = await response.json();
        if(response.ok){
          setAuthors(data.authors)
        }
        else{
          setAuthors([])
        }
      } catch (error) {
        console.log("Error in popular author fetch authors")
      }
    };
    fetchAuthors();
  }, []);
  return (
    <article
    className={
      mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"
    }
  >
    <h2>Authors</h2>
    <div className="container">
      {authors && authors.length > 0 ? (
        authors.map((element) => {
          return (
            <div className="card" key={element._id}>
              {/* {authors && authors.avatar && ( */}
                <img src={element.avatar.url} alt="author_avatar" />
              {/* )} */}
              <h3>{element.name}</h3>
              <p>{element.role}</p>
            </div>
          );
        })
      ) : (
        <BeatLoader color="gray" size={50} style={{ padding: "200px 0" }} />
      )}
    </div>
  </article>
  )
}

export default AllAuthors