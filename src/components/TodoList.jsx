import React, { useEffect, useState } from "react";

const USERNAME = "damloop";

// ENDPOINTS CORRECTOS
const USER_URL = `https://playground.4geeks.com/todo/users/${USERNAME}`;
const TODOS_URL = `https://playground.4geeks.com/todo/todos/${USERNAME}`;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState("");

  // CREA EL USUARIO SI NO EXISTE (LA API DEVUELVE 400)
  const ensureUserExists = async () => {
    try {
      const res = await fetch(USER_URL);

      if (!res.ok) {
        const createRes = await fetch(USER_URL, { method: "POST" });
        if (!createRes.ok) throw new Error("No se pudo crear el usuario.");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // CARGA LAS TAREAS DESDE /users/damloop
  const loadTasks = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(USER_URL);
      if (!res.ok) throw new Error("Error al cargar tareas.");

      const data = await res.json();
      const list = data.todos || [];

      setTasks(list);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // AÑADIR TAREA
  const addTask = async () => {
    const trimmed = taskInput.trim();
    if (!trimmed) {
      setInputError("La tarea no puede estar vacía.");
      return;
    }

    setInputError("");

    const newTask = { label: trimmed, is_done: false };

    try {
      setIsLoading(true);

      const res = await fetch(TODOS_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok)
        throw new Error(`Error al crear tarea (${res.status}).`);

      setTaskInput("");
      await loadTasks();
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // BORRAR UNA TAREA POR ID
  const deleteTask = async (id) => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Error al eliminar tarea.");

      await loadTasks();
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // BORRAR TODAS LAS TAREAS (SOLUCIÓN AL ERROR 422)
  const clearAll = async () => {
    const confirmed = window.confirm("¿Seguro que quieres borrar todo?");
    if (!confirmed) return;

    try {
      setIsLoading(true);

      // Borrar cada tarea por ID (evita el error 422)
      for (const task of tasks) {
        await fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
          method: "DELETE",
        });
      }

      await loadTasks();
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // INICIALIZACIÓN
  useEffect(() => {
    const init = async () => {
      await ensureUserExists();
      await loadTasks();
    };
    init();
  }, []);

  const pending = tasks.filter((t) => !t.is_done).length;

  return (
    <div className="todo-container">
      <h2 style={{ marginBottom: "20px", color: "#e5e7eb" }}>Todo List</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask} disabled={isLoading}>
          Añadir
        </button>
      </div>

      {inputError && <p className="input-error">{inputError}</p>}
      {errorMessage && <p className="request-error">{errorMessage}</p>}
      {isLoading && <p className="loading-text">Cargando...</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.label}
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              X
            </button>
          </li>
        ))}
      </ul>

      <p className="pending-count">
        Tareas pendientes: <strong>{pending}</strong>
      </p>

      <button className="clear-btn" onClick={clearAll} disabled={isLoading}>
        Borrar todo
      </button>

      <p className="footer-signature">
        Made with ❤️ by <span>Damian</span>
      </p>
    </div>
  );
};

export default TodoList;
