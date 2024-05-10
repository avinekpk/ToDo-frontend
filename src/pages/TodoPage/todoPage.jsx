import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "../../components/Todos/todos";
import "./todoPage.css";
import { useParams, useNavigate } from "react-router-dom";

const TodoPage = () => {
  let { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  const fetchProjectData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjectData(response.data.project);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  const handleAddTodo = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:5000/todos/${id}`,
      { todo: newTodo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Todo added successfully:", response.data);
    fetchProjectData();
    setNewTodo("");
  };

  const generateMarkdown = () => {
    const completedTodos = projectData.todos
      .filter((todo) => todo.status)
      .map((todo) => `- [x] ${todo.description}`)
      .join("\n");
    const pendingTodos = projectData.todos
      .filter((todo) => !todo.status)
      .map((todo) => `- [ ] ${todo.description}`)
      .join("\n");
    const completedCount = projectData.todos.filter(
      (todo) => todo.status
    ).length;
    const totalCount = projectData.todos.length;

    const markdownText = `
## ${projectData.title}

**Summary :** ${completedCount}/${totalCount} Todos completed

### Pending

${pendingTodos}

### Completed

${completedTodos}
    `;

    const element = document.createElement("a");
    const file = new Blob([markdownText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${projectData.title.replace(/ /g, "_")}.md`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="todo-page-box">
      <div className="todo-page-container">
        {projectData ? (
          <>
            <div className="button-container">
              <button className="back-button" onClick={() => navigate("/home")}>
                Back
              </button>
              <button
                onClick={generateMarkdown}
                className="download-markdown-button"
              >
                Download Project Summary
              </button>
            </div>
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
            <div className="todos-container scrollable">
              <p className="pending">Pending</p>
              {projectData.todos.map((item) => {
                if (!item.status) {
                  return (
                    <Todo
                      description={item.description}
                      todoId={item._id}
                      projectId={id}
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
                      todoId={item._id}
                      projectId={id}
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
    </div>
  );
};

export default TodoPage;
