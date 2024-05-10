import React, { useState } from "react";
import axios from "axios";
import "./newProject.css";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([""]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddTodo = () => {
    setTodos([...todos, ""]);
  };

  const handleTodoChange = (index, value) => {
    const newTodos = [...todos];
    newTodos[index] = value;
    setTodos(newTodos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/project",
        {
          title,
          todo: todos.filter((todo) => todo.trim() !== ""), // Filter out empty todos
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      // Handle success, maybe redirect or show a success message

      navigate("/home");
    } catch (error) {
      console.error("Error:", error.response.data);
      // Handle error, maybe show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Todos:</label>
        {todos.map((todo, index) => (
          <input
            key={index}
            type="text"
            value={todo}
            onChange={(e) => handleTodoChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default NewProject;
