import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mode} = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [intro, setIntro] = useState("");
  const [paraOneTitle, setParaOneTitle] = useState("");
  const [paraOneDescription, setParaOneDescription] = useState("");
  const [paraTwoTitle, setParaTwoTitle] = useState("");
  const [paraTwoDescription, setParaTwoDescription] = useState("");
  const [published, setPublished] = useState(true);
  // images
  const [mainImage, setMainImage] = useState("");
  const [paraOneImage, setParaOneImage] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  // image previews
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [paraOneImagePreview, setParaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
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
          setTitle(data.blog.title);
          setIntro(data.blog.intro);
          setCategory(data.blog.category);
          setPublished(data.blog.published);
          setMainImage(data.blog.mainImage.url);
          data.blog.paraOneTitle && setParaOneTitle(data.blog.paraOneTitle);
          data.blog.paraOneDescription &&
            setParaOneDescription(data.blog.paraOneDescription);
          data.blog.paraOneImage && setParaOneImage(data.blog.paraOneImage.url);
          data.blog.paraTwoTitle && setParaTwoTitle(data.blog.paraTwoTitle);
          data.blog.paraTwoDescription &&
            setParaTwoDescription(data.blog.paraTwoDescription);
          data.blog.paraTwoImage && setParaTwoImage(data.blog.paraTwoImage.url);
        }
      } catch (error) {
        console.log("Erro in update blog fetch single blog", error);
      }
    };
    fetchBlog();
  }, [id]);

  

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedBlog = new FormData();
    updatedBlog.append("title", title);
    updatedBlog.append("intro", intro);
    updatedBlog.append("category", category);
    updatedBlog.append("published", published);
    updatedBlog.append("mainImage", mainImage);

    if (paraOneTitle && paraOneTitle.length !== 0) {
      updatedBlog.append("paraOneTitle", paraOneTitle);
    } else {
      updatedBlog.append("paraOneTitle", "");
    }
    if (paraOneDescription && paraOneDescription.length !== 0) {
      updatedBlog.append("paraOneDescription", paraOneDescription);
    } else {
      updatedBlog.append("paraOneDescription", "");
    }
    if (paraOneImage) {
      updatedBlog.append("paraOneImage", paraOneImage);
    }
    if (paraTwoTitle && paraTwoTitle.length !== 0) {
      updatedBlog.append("paraTwoTitle", paraTwoTitle);
    } else {
      updatedBlog.append("paraTwoTitle", "");
    }
    if (paraTwoDescription && paraTwoDescription.length !== 0) {
      updatedBlog.append("paraTwoDescription", paraTwoDescription);
    } else {
      updatedBlog.append("paraTwoDescription", "");
    }
    if (paraTwoImage) {
      updatedBlog.append("paraTwoImage", paraTwoImage);
    }

    try {
      const response = await fetch(
        `https://mern-bloggin-app-server.onrender.com/api/v1/blogs/update/${id}`,
        {
          method: "PUT",
          body: updatedBlog,
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in update blog handleUpdate,", error);
    }
  };

  const mainImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result);
      setMainImage(file);
    };
  };
  const paraOneImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImagePreview(reader.result);
      setParaOneImage(file);
    };
  };
  const paraTwoImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImagePreview(reader.result);
      setParaTwoImage(file);
    };
  };

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="update-blog">
        <h3>Update blog</h3>
        <form>
          <div className="category-box">
          <label>Category<sup style={{color: 'red'}}>*</sup></label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Blog Category</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Business">Business</option>
              <option value="Economy">Economy</option>
            </select>
          </div>
          <label>Blog main title<sup style={{color: 'red'}}>*</sup></label>
          <input
            type="text"
            placeholder="Blog main title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <label>Blog main image<sup style={{color: 'red'}}>*</sup></label>
            <img
              src={
                mainImagePreview
                  ? `${mainImagePreview}` // If paraOneImage exists, use it directly
                  : mainImage // Otherwise, use paraOneImagePreview
                  ? `${mainImage}`
                  : "/imgPL.webp" // If neither paraOneImage nor paraOneImagePreview exists, use an empty string
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={mainImagePreviewHandler}
              style={{ border: "none" }}
            />
          </div>
          <label>Blog intro<sup style={{color: 'red'}}>*</sup></label>
          <textarea
            rows="25"
            className="intro"
            placeholder="Blog intro(Must contain at least 100 characters!)"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph one title"
              value={
                paraOneTitle && paraOneTitle.length > 0 ? paraOneTitle : ""
              }
              onChange={(e) => setParaOneTitle(e.target.value)}
            />
            <img
              src={
                paraOneImagePreview
                  ? `${paraOneImagePreview}` // If paraOneImage exists, use it directly
                  : paraOneImage // Otherwise, use paraOneImagePreview
                  ? `${paraOneImage}`
                  : "/imgPL.webp" // If neither paraOneImage nor paraOneImagePreview exists
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={paraOneImagePreviewHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Blog First Sub Paragraph Comes Here..."
              value={
                paraOneDescription && paraOneDescription.length > 0
                  ? paraOneDescription
                  : ""
              }
              onChange={(e) => setParaOneDescription(e.target.value)}
            />
          </div>
          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph two title"
              value={
                paraTwoTitle && paraTwoTitle.length > 0 ? paraTwoTitle : ""
              }
              onChange={(e) => setParaTwoTitle(e.target.value)}
            />
            <img
              src={
                paraTwoImagePreview
                  ? `${paraTwoImagePreview}`
                  : paraTwoImage
                  ? `${paraTwoImage}`
                  : "/imgPL.webp" 
              }
              alt="subParaOneImg"
            />
            <input
              type="file"
              onChange={paraTwoImagePreviewHandler}
              style={{ border: "none" }}
            />
            <textarea
              rows="10"
              placeholder="Blog Second Sub Paragraph Comes Here..."
              value={
                paraTwoDescription && paraTwoDescription.length > 0
                  ? paraTwoDescription
                  : ""
              }
              onChange={(e) => setParaTwoDescription(e.target.value)}
            />
          </div>
          <div className="publish-box">
            <label>Published?</label>
            <select
              value={published === null ? "" : published}
              onChange={(e) => setPublished(e.target.value === "true")}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </section>
    </article>
  );
};

export default UpdateBlog;
