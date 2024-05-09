import React from "react";
import axios from "axios";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import "./homeTile.css";

const Hometile = ({ tilename, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        "http://localhost:5000/project/663cfb8ffaaaff651649510d",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="home-tile">
      <span className="hometile">{tilename}</span>
      <button onClick={handleDelete}>
        <ClearIcon />
      </button>
    </div>
  );
};

export default Hometile;
