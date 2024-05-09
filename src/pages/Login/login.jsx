import React from "react";
import "./login.css";

const Login = () => {
  const onLogin = () => {
    console.log("hi");
  };
  return (
    <div className="loginPage">
      <div>
        <p className="email"> Email</p>
        <input type="email" />
      </div>
      <div>
        <p className="password"> Password</p>
        <input type="password" className="password" />
      </div>
      <div>
        <button className="login" onClick={onLogin}>
          <a href="/home">Login</a>
        </button>
        <button className="signup">
          <a href="/signup">Signup</a>
        </button>
      </div>
    </div>
  );
};

export default Login;
