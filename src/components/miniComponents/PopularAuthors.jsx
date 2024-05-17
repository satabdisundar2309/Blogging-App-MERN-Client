import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);
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
    <section className="popularAuthors">
    <h3>Popular Authors</h3>
    <div className="container">
      {authors && authors.length > 0 ? (
        authors.slice(0, 4).map((element) => {
          return (
            <div className="card" key={element._id}>
              <img src={element.avatar.url} alt="author" />
              <p>{element.name}</p>
              <p>{element.role}</p>
            </div>
          );
        })
      ) : (
        <BeatLoader color="gray" size={30} />
      )}
    </div>
  </section>
  )
}

export default PopularAuthors