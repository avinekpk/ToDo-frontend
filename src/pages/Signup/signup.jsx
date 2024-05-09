import React from "react";

const Signup = () => {
  const onSignup = () => {
    console.log("hi");
  };
  return (
    <div className="signupPage">
      <div>
        <p className="username"> Username</p>
        <input type="text" />
      </div>
      <div>
        <p className="email"> Email</p>
        <input type="email" />
      </div>
      <div>
        <p className="password"> Password</p>
        <input type="password" className="password" />
      </div>
      <div>
        <button className="signup" onClick={onSignup}>
          {" "}
          Signup
        </button>
        <button className="login">
          <a href="/login">Login</a>
        </button>
      </div>
    </div>
  );
};

export default Signup;
