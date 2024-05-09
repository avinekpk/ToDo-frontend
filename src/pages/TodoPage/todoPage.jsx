import React from "react";
import Todo from "../../components/Todos/todos";

const TodoPage = () => {
  const todo = {
    _id: "663b30241a37d941d18467b2",
    title: "test title 1",
    todos: [
      {
        _id: "663b30241a37d941d18467aa",
        description: "todo 1",
        status: true,
        createdAt: "2024-05-08T07:56:20.498Z",
        updatedAt: "2024-05-08T07:58:53.038Z",
        __v: 0,
      },
      {
        _id: "663b30241a37d941d18467ab",
        description: "todo 2",
        status: false,
        createdAt: "2024-05-08T07:56:20.500Z",
        updatedAt: "2024-05-08T07:56:20.500Z",
        __v: 0,
      },
      {
        _id: "663b30241a37d941d18467ac",
        description: "todo 3",
        status: false,
        createdAt: "2024-05-08T07:56:20.500Z",
        updatedAt: "2024-05-08T07:56:20.500Z",
        __v: 0,
      },
      {
        _id: "663b30241a37d941d18467ad",
        description: "todo 4",
        status: false,
        createdAt: "2024-05-08T07:56:20.501Z",
        updatedAt: "2024-05-08T07:56:20.501Z",
        __v: 0,
      },
    ],
    createdAt: "2024-05-08T07:56:20.544Z",
    updatedAt: "2024-05-08T07:56:20.544Z",
    __v: 0,
    summary: "0/4 todos completed",
  };

  return (
    <div>
      <p className="title">{todo.title}</p>
      <p className="summary">Summary: {todo.summary}</p>
      <p className="pending">Peding</p>
      {todo.todos.map((item, e) => {
        if (!item.status) {
          return <Todo description={item} checkedValue={item.status} key={e} />;
        }
      })}
      <p className="completed">Completed</p>
      {todo.todos.map((item, e) => {
        if (item.status) {
          return <Todo description={item} checkedValue={item.status} key={e} />;
        }
      })}
    </div>
  );
};

export default TodoPage;
