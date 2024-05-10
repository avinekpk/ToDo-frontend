import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]); // Only run the effect once when the component mounts

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
