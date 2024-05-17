import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
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

  const navigate = useNavigate()

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

  const handleBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("intro", intro);
    formData.append("category", category);
    formData.append("published", published);
    formData.append("mainImage", mainImage);
    if (paraOneTitle.length > 0) {
      formData.append("paraOneTitle", paraOneTitle);
    }
    if (paraOneDescription.length > 0) {
      formData.append("paraOneDescription", paraOneDescription);
    }
    if (paraOneImage) {
      formData.append("paraOneImage", paraOneImage);
    }
    if (paraTwoTitle.length > 0) {
      formData.append("paraTwoTitle", paraTwoTitle);
    }
    if (paraTwoDescription.length > 0) {
      formData.append("paraTwoDescription", paraTwoDescription);
    }
    if (paraTwoImage) {
      formData.append("paraTwoImage", paraTwoImage);
    }

    try {
      const response = await fetch("https://mern-bloggin-app-server.onrender.com/api/v1/blogs/post", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTitle("");
        setIntro("");
        setCategory("");
        setMainImage("");
        setMainImagePreview("");
        setParaOneTitle("");
        setParaOneDescription("");
        setParaOneImage("");
        setParaOneImagePreview("");
        setParaTwoTitle("");
        setParaTwoDescription("");
        setParaTwoImage("");
        setParaTwoImagePreview("");
        toast.success(data.message);
        navigate('/dashboard')
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in create blog", error);
    }
  };

  return (
    <section className="create-blog">
    <h3>Create a blog</h3>
    <div className="container">
      <form onSubmit={handleBlog}>
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
          placeholder="Blog main title*..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Blog main image<sup style={{color: 'red'}}>*</sup></label>
          <img
            src={mainImagePreview ? `${mainImagePreview}` : "/imgPL.webp"}
            alt="mainImg"
            className="mainImg"
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
            value={paraOneTitle}
            onChange={(e) => setParaOneTitle(e.target.value)}
          />
          <img
            src={
              paraOneImagePreview ? `${paraOneImagePreview}` : "/imgPL.webp"
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
            value={paraOneDescription}
            onChange={(e) => setParaOneDescription(e.target.value)}
          />
        </div>
        <div className="sub-para">
          <input
            type="text"
            placeholder="Paragraph two title"
            value={paraTwoTitle}
            onChange={(e) => setParaTwoTitle(e.target.value)}
          />
          <img
            src={
              paraTwoImagePreview ? `${paraTwoImagePreview}` : "/imgPL.webp"
            }
            alt="subParaTwoImg"
          />
          <input
            type="file"
            onChange={paraTwoImagePreviewHandler}
            style={{ border: "none" }}
          />
          <textarea
            rows="10"
            placeholder="Blog Second Sub Paragraph Comes Here..."
            value={paraTwoDescription}
            onChange={(e) => setParaTwoDescription(e.target.value)}
          />
        </div>
        <div className="publish-box">
          <label>Publish now?</label>
          <select
            value={published}
            onChange={(e) => setPublished(e.target.value === "true")}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button className="create-btn" type="submit">
          Post Blog
        </button>
      </form>
    </div>
  </section>
  );
};

export default CreateBlog;
