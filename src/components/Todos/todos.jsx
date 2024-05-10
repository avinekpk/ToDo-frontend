import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import "./todo.css";

const Todo = ({ description, todoId, projectId, checkedValue }) => {
  console.log("description", description);

  const handleCheckboxChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/todo/${todoId}`, // Use the correct endpoint
        {
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Todo updated successfully:", response.data);

      window.location.reload();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/todos/${todoId}/${projectId}`, // Use the correct endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Todo deleted successfully:", response.data);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="todo">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={checkedValue}
              onChange={handleCheckboxChange}
            />
          }
          label={description}
          className="todo-label"
        />
      </FormGroup>
      <div className="todo-actions">
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Todo;
