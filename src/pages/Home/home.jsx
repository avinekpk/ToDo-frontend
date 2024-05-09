import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Hometile from "../../components/HomeTile/homeTile";
import "./home.css";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Use navigate to redirect to '/login'
  };

  return (
    <div className="homePage">
      <div className="header">
        <button
          className="new-project-button"
          onClick={() => navigate("/newproject")}
        >
          <AddIcon /> New Project
        </button>
        <h1>Projects</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {projects.map((item) => (
        <Hometile tilename={item.title} key={item._id} />
      ))}
    </div>
  );
};

export default Home;
