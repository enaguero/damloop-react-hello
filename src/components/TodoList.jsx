import React, { useEffect, useState } from "react";

const USERNAME = "damloop";
const API_BASE_URL = "https://playground.4geeks.com/todo";
const USER_URL = `${API_BASE_URL}/users/${USERNAME}`;
const TODOS_URL = `${API_BASE_URL}/todos/${USERNAME}`;
const getTodoItemUrl = (todoId) => `${API_BASE_URL}/todos/${todoId}`;

function getErrorMessage(error, fallbackMessage) {
  return error instanceof Error ? error.message : fallbackMessage;
}

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState("");

  const ensureUserExists = async () => {
    setErrorMessage("");

    try {
      const response = await fetch(USER_URL);

      if (response.ok) return true;

      // Esta API puede responder 400 o 404 cuando el usuario no existe.
      if (![400, 404].includes(response.status)) {
        throw new Error(`No se pudo validar el usuario (${response.status}).`);
      }

      const createResponse = await fetch(USER_URL, { method: "POST" });
      if (!createResponse.ok) throw new Error("No se pudo crear el usuario.");

      return true;
    } catch (err) {
      setErrorMessage(
        getErrorMessage(err, "Ocurrió un error validando el usuario.")
      );
      return false;
    }
  };

  const loadTasks = async () => {
    setErrorMessage("");

    try {
      setIsLoading(true);

      const response = await fetch(USER_URL);
      if (!response.ok) {
        throw new Error(`Error al cargar tareas (${response.status}).`);
      }

      const data = await response.json();
      const todoList = data.todos || [];

      setTasks(todoList);
    } catch (err) {
      setErrorMessage(getErrorMessage(err, "No se pudieron cargar las tareas."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const nextValue = event.target.value;
    setTaskInput(nextValue);

    if (inputError && nextValue.trim() !== "") {
      setInputError("");
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const addTask = async () => {
    const trimmed = taskInput.trim();
    if (!trimmed) {
      setInputError("La tarea no puede estar vacía.");
      return;
    }

    setErrorMessage("");
    setInputError("");

    const newTask = { label: trimmed, is_done: false };

    try {
      setIsLoading(true);

      const response = await fetch(TODOS_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error al crear tarea (${response.status}).`);
      }

      setTaskInput("");
      await loadTasks();
    } catch (err) {
      setErrorMessage(getErrorMessage(err, "No se pudo crear la tarea."));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setErrorMessage("");

    try {
      setIsLoading(true);

      const response = await fetch(getTodoItemUrl(id), { method: "DELETE" });

      if (!response.ok) throw new Error("Error al eliminar tarea.");

      await loadTasks();
    } catch (err) {
      setErrorMessage(getErrorMessage(err, "No se pudo eliminar la tarea."));
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = async () => {
    if (tasks.length === 0) return;

    const confirmed = window.confirm("¿Seguro que quieres borrar todo?");
    if (!confirmed) return;

    setErrorMessage("");

    try {
      setIsLoading(true);

      for (const task of tasks) {
        const response = await fetch(getTodoItemUrl(task.id), {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`No se pudo borrar la tarea "${task.label}".`);
        }
      }

      await loadTasks();
    } catch (err) {
      setErrorMessage(getErrorMessage(err, "No se pudieron borrar las tareas."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const userReady = await ensureUserExists();
      if (userReady) {
        await loadTasks();
      }
    };

    init();
  }, []);

  const pendingTasksCount = tasks.filter((task) => !task.is_done).length;

  return (
    <div className="todo-container">
      <h2 className="todo-title">Todo List</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={taskInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button type="button" onClick={addTask} disabled={isLoading}>
          Añadir
        </button>
      </div>

      {inputError && <p className="input-error">{inputError}</p>}
      {errorMessage && <p className="request-error">{errorMessage}</p>}
      {isLoading && <p className="loading-text">Cargando...</p>}

      {!isLoading && tasks.length === 0 ? (
        <p className="empty-state">No hay tareas guardadas todavía.</p>
      ) : (
        <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-label">{task.label}</span>
            <button
              type="button"
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label={`Eliminar tarea ${task.label}`}
            >
              X
            </button>
          </li>
        ))}
        </ul>
      )}

      <p className="pending-count">
        Tareas pendientes: <strong>{pendingTasksCount}</strong>
      </p>

      <button
        type="button"
        className="clear-btn"
        onClick={clearAll}
        disabled={isLoading || tasks.length === 0}
      >
        Borrar todo
      </button>

      <p className="footer-signature">
        Made with ❤️ by <span>Damian</span>
      </p>
    </div>
  );
};

export default TodoList;
