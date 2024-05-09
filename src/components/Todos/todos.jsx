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

const Todo = ({ description, checkedValue }) => {
  console.log("description", description);

  const handleCheckboxChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/todo/663d2fd0df7276ab63eccf7b", // Use the correct endpoint
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
    } catch (error) {
      console.error("Error updating todo:", error);
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
        <IconButton aria-label="delete">
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Todo;
