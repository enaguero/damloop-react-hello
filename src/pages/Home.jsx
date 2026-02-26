import React from "react";
import TodoList from "../components/TodoList";
import "../styles/todo.css";

const Home = () => {
  return (
    <div className="app-container">
      <h1>Todo List con Fetch</h1>
      <TodoList />
    </div>
  );
};

export default Home;
