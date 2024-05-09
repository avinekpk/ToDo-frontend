import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "../../components/Todos/todos";
import "./todoPage.css";

const TodoPage = () => {
  const [projectData, setProjectData] = useState(null);
  const [newTodo, setNewTodo] = useState(""); // State for the new todo input

  const fetchProjectData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/project/663b30241a37d941d18467b2",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjectData(response.data.project);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  const handleAddTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/todos/663b30241a37d941d18467b2", // Use the correct endpoint
        {
          todo: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Todo added successfully:", response.data);
      // Fetch project data again to update with the new todo
      fetchProjectData();
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="todo-page-container">
      {projectData ? (
        <>
          <p className="title">{projectData.title}</p>
          <p className="summary">Summary: {projectData.summary}</p>
          <div className="add-todo-container">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter new todo"
            />
            <button onClick={handleAddTodo}>Add Todo</button>
          </div>
          <div className="todos-container">
            <p className="pending">Pending</p>
            {projectData.todos.map((item) => {
              if (!item.status) {
                return (
                  <Todo
                    description={item.description}
                    checkedValue={item.status}
                    key={item._id}
                  />
                );
              }
            })}
            <p className="completed">Completed</p>
            {projectData.todos.map((item) => {
              if (item.status) {
                return (
                  <Todo
                    description={item.description}
                    checkedValue={item.status}
                    key={item._id}
                  />
                );
              }
            })}
          </div>
        </>
      ) : (
        <p>Loading project data...</p>
      )}
    </div>
  );
};

export default TodoPage;
