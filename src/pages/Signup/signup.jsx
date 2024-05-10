import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User created successfully:", response.data);

      localStorage.setItem("token", response.data.token);

      navigate("/home");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="signupPage">
      <div>
        <p className="username">Username</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
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
        <button className="signup" onClick={onSignup}>
          Signup
        </button>
        <p className="login">
          <a href="/login">Login?</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
