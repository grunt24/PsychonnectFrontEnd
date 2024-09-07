import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import loginService from "../../api/loginService";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { success, token, error } = await loginService.login(
      userName,
      password
    );

    if (userName === "admin" && password === "admin123" && success) {
      console.log("Login successful, token:", token);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to a protected route

      window.location.reload();
    } else {
      console.error("Login failed:", error);
      setError(error); // Display error to user
      alert(`Error: ${error}`);
    }
  };

  return (
    <>
      <div className="addUser">
        <div className="back">
          <Link to="/" type="submit" className="btn btn-outline-danger">
            <span>
              <i class="bi bi-x-circle"></i>
            </span>
          </Link>
        </div>
        <h3>LOGIN</h3>
        <form className="addUserForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
