import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");

    // If token doesn't exist, navigate to '/login'
    if (!token) {
      navigate("/login");
    }
  }, [navigate]); // Only run the effect once when the component mounts

  // Render the child routes
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
