import React, { useEffect, useState } from "react";

const USERNAME = "damloop";
const API_URL = `https://playground.4geeks.com/todo/todos/${USERNAME}`;
const USER_URL = `https://playground.4geeks.com/todo/users/${USERNAME}`;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  const createUserIfNeeded = async () => {
    try {
      await fetch(USER_URL, { method: "POST" });
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  const getTasks = async () => {
    try {
      const resp = await fetch(API_URL);
      if (!resp.ok) return;
      const data = await resp.json();
      setTasks(data);
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
    }
  };

  const addTask = async (label) => {
    if (!label.trim()) return;

    const newTask = { label: label.trim(), is_done: false };

    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });
      await getTasks();
    } catch (error) {
      console.error("Error añadiendo tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      await getTasks();
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  const clearAll = async () => {
    try {
      await fetch(API_URL, { method: "DELETE" });
      setTasks([]);
    } catch (error) {
      console.error("Error eliminando todas:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await createUserIfNeeded();
      await getTasks();
    };
    init();
  }, []);

  return (
    <div className="todo-container">
      <h1>TODO List con API</h1>

      <input
        type="text"
        placeholder="Escribe una tarea y pulsa Enter"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask(e.target.value);
            e.target.value = "";
          }
        }}
      />

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.label}
            <button onClick={() => deleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>

      <button className="clear-btn" onClick={clearAll}>
        Eliminar todas las tareas
      </button>
    </div>
  );
};

export default TodoList;
