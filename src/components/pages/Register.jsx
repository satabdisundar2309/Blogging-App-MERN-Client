import React, { useContext, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const changeAvatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const { mode, isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("education", education);
    formData.append("role", role);
    formData.append("avatar", avatar);

    try {
      const response = await fetch(
        "https://mern-bloggin-app-server.onrender.com/api/v1/user/register",
        {
          method: "POST",
          body: formData,
          
        }
      );

      const data = await response.json();
      if (response.ok) {
        setName("");
        setEmail("");
        setEducation("");
        setPassword("");
        setPhone("");
        setRole("");
        setAvatar("");
        setAvatarPreview("");
        setIsAuthenticated(true)
        localStorage.setItem("token", data.token)
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in register page handleRegister ", error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Reader">Reader</option>
            <option value="Author">Author</option>
          </select>
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="">Select Education</option>
            <option value="Matric">Matric</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Graduation">Graduation</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="avatar">
              <img
                src={avatarPreview ? `${avatarPreview}` : "/pic.png"}
                alt="avatar"
              />
            </div>
            <input
              type="file"
              onChange={changeAvatarHandler}
              className="avatar_input_tag"
              style={{ border: "none" }}
            />
          </div>
          <p>
            Already Registered? <NavLink to={"/login"}>Login Now</NavLink>
          </p>
          <button className="submit-btn" type="submit">
            Register
          </button>
        </form>
      </section>
    </article>
  );
};

export default Register;
