import React, { useEffect, useState } from "react";

const USERNAME = "damloop";
const API_URL = `https://playground.4geeks.com/todo/todos/${USERNAME}`;
const USER_URL = `https://playground.4geeks.com/todo/users/${USERNAME}`;
const TODO_ITEM_URL = "https://playground.4geeks.com/todo/todos";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState("");

  const ensureUserExists = async () => {
    const userResponse = await fetch(USER_URL);

    if (userResponse.status === 404) {
      const createResponse = await fetch(USER_URL, { method: "POST" });

      if (!createResponse.ok) {
        throw new Error("No se pudo crear el usuario en la API.");
      }

      return;
    }

    if (!userResponse.ok) {
      throw new Error(`Error al validar usuario (${userResponse.status}).`);
    }
  };

  const loadTasks = async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    setErrorMessage("");

    try {
      await ensureUserExists();

      const response = await fetch(USER_URL);
      if (!response.ok) {
        throw new Error(`Error al cargar tareas (${response.status}).`);
      }

      const data = await response.json();
      setTasks(Array.isArray(data.todos) ? data.todos : []);
    } catch (error) {
      setErrorMessage(error.message || "No se pudieron cargar las tareas.");
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  const addTask = async () => {
    const trimmedTask = taskInput.trim();
    if (!trimmedTask) {
      setInputError("La tarea no puede estar vacia.");
      return;
    }

    setInputError("");
    setErrorMessage("");
    setIsLoading(true);

    const newTask = { label: trimmedTask, is_done: false };
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error al crear tarea (${response.status}).`);
      }

      setTaskInput("");
      await loadTasks(false);
    } catch (error) {
      setErrorMessage(error.message || "No se pudo agregar la tarea.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${TODO_ITEM_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar tarea (${response.status}).`);
      }

      await loadTasks(false);
    } catch (error) {
      setErrorMessage(error.message || "No se pudo eliminar la tarea.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = async () => {
    if (tasks.length === 0) return;
    const confirmed = window.confirm("Se borraran todas las tareas. Continuar?");
    if (!confirmed) return;

    setErrorMessage("");
    setIsLoading(true);

    try {
      const deletePromises = tasks.map((task) =>
        fetch(`${TODO_ITEM_URL}/${task.id}`, {
          method: "DELETE",
        })
      );

      const responses = await Promise.all(deletePromises);
      const failedRequest = responses.find((response) => !response.ok);

      if (failedRequest) {
        throw new Error(`Error al borrar todo (${failedRequest.status}).`);
      }

      await loadTasks(false);
    } catch (error) {
      setErrorMessage(error.message || "No se pudieron borrar todas las tareas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const pendingTasks = tasks.filter((task) => !task.is_done).length;

  return (
    <div className="todo-container">
      <h1>TODO List con API</h1>
      <p className="helper-text">Usuario: {USERNAME}</p>

      <input
        type="text"
        placeholder="Escribe una tarea y pulsa Enter"
        value={taskInput}
        disabled={isLoading}
        onChange={(event) => {
          setTaskInput(event.target.value);
          if (inputError) setInputError("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />
      {inputError && <p className="input-error">{inputError}</p>}
      {errorMessage && <p className="request-error">{errorMessage}</p>}
      {isLoading && <p className="loading-text">Cargando tareas...</p>}

      <ul>
        {tasks.length === 0 && !isLoading ? (
          <li className="empty-state">No hay tareas pendientes.</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              {task.label}
              <button className="delete-btn" onClick={() => deleteTask(task.id)} disabled={isLoading}>
                X
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="footer-row">
        <span>{pendingTasks} item{pendingTasks !== 1 ? "s" : ""} left</span>
      </div>

      <button className="clear-btn" onClick={clearAll} disabled={isLoading || tasks.length === 0}>
        Eliminar todas las tareas
      </button>
    </div>
  );
};

export default TodoList;
