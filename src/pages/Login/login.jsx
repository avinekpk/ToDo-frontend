import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const onLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Logged in successfully:", response.data);

      // Store token in local storage
      localStorage.setItem("token", response.data.token);

      // Redirect to home page
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="loginPage">
      <div>
        <p className="email">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <p className="password">Password</p>
        <input
          type="password"
          className="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button className="login" onClick={onLogin}>
          Login
        </button>
        <p className="signup">
          <a href="/signup">Signup?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
