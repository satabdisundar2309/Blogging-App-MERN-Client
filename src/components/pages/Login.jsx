import React, { useContext, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { mode, isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://mern-bloggin-app-server.onrender.com/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password, role }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true)
        toast.success(data.message);
        setEmail("");
        setPassword("");
        setRole("");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in login page handle login", error);
    }
  };

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="Reader">Reader</option>
              <option value="Author">Author</option>
            </select>
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            Don't have any Account? <NavLink to={"/register"}>Register Now</NavLink>
          </p>

          <button className="submit-btn" type="submit">
            Login
          </button>
        </form>
      </section>
    </article>
  );
};

export default Login;
