import React from "react";
import axios from "axios";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import "./homeTile.css";

const Hometile = (props) => {
  const { tilename, projectId, onClick } = props;
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="home-tile">
      <span className="hometile" onClick={onClick}>
        {tilename}
      </span>
      <button onClick={handleDelete}>
        <ClearIcon />
      </button>
    </div>
  );
};

export default Hometile;
