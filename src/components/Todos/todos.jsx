import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import "./todo.css";

const Todo = ({ description, todoId, projectId, checkedValue }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleCheckboxChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/todo/${todoId}`,
        {
          description: editedDescription,
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
        `http://localhost:5000/todos/${todoId}/${projectId}`,
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

  const handleEdit = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveEdit = async () => {
    setOpenModal(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/todos/${todoId}`,
        {
          description: editedDescription,
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
        <IconButton aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <ClearIcon />
        </IconButton>
      </div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Todo</DialogTitle>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EditIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <TextField
                label="Description"
                variant="outlined"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleSaveEdit}>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default Todo;
