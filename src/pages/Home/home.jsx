import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hometile from "../../components/HomeTile/homeTile";
import "./home.css";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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
    navigate("/login");
  };

  return (
    <div className="homePage-box">
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
        <div className="hometiles-container">
          {projects.map((item) => (
            <Hometile
              tilename={item.title}
              projectId={item._id}
              key={item._id}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/project/${item._id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
