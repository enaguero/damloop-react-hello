import React, { useEffect, useState } from "react";

const USERNAME = "damloop";
const API_URL = `https://playground.4geeks.com/todo/todos/${USERNAME}`;
const USER_URL = `https://playground.4geeks.com/todo/users/${USERNAME}`;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  // ❌ ANTI-PATRÓN CRÍTICO: Faltan estados de loading y error
  // ⚠️ PROBLEMA: Sin feedback visual durante operaciones async
  // ✅ SOLUCIÓN:
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // 💡 Esto permite renderizado condicional: if (loading) return <Spinner />

  // ✅ PATRÓN POSITIVO: Creación automática de usuario
  // 💡 Maneja el caso de usuario no existente sin romper el flujo
  const createUserIfNeeded = async () => {
    try {
      await fetch(USER_URL, { method: "POST" });
    } catch (error) {
      // Si ya existe, la API devuelve error, pero no pasa nada
      console.warn("Usuario ya existente o creado.");
      // ✅ BIEN: console.warn (no error) porque no es un problema real
    }
  };

  // Obtener tareas
  const getTasks = async () => {
    try {
      // ✅ PATRÓN POSITIVO: URL correcta para obtener usuario con sus todos
      const resp = await fetch(USER_URL);
      if (!resp.ok) return;
      const data = await resp.json();
      setTasks(data.todos); // ✅ BIEN: data.todos contiene el array de tareas
      // ⚠️ MEJORA RECOMENDADA: Agregar finally { setLoading(false); }
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
      // ❌ ANTI-PATRÓN: Error solo en console, usuario no lo ve
      // ✅ SOLUCIÓN: setError(error.message);
    }
  };


  // Añadir tarea
  const addTask = async (label) => {
    if (!label.trim()) return; // ✅ PATRÓN POSITIVO: Validación con .trim()

    const newTask = { label: label.trim(), is_done: false };

    try {
      // ⚠️ OPORTUNIDAD DE MEJORA: No verifica response.ok
      const resp = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });
      // ❌ ANTI-PATRÓN: Re-fetch innecesario
      // ⚠️ PROBLEMA: 2 requests en lugar de 1 (más lento)
      // ✅ MEJOR: const createdTask = await resp.json(); setTasks([...tasks, createdTask]);
      await getTasks();
    } catch (error) {
      console.error("Error añadiendo tarea:", error);
    }
  };

  // Eliminar una tarea
  const deleteTask = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      // ❌ ANTI-PATRÓN: Re-fetch innecesario después de DELETE
      // ✅ MEJOR: setTasks(tasks.filter(task => task.id !== id));
      // 💡 Más rápido y misma inmutabilidad que en TodoList básico
      await getTasks();
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  // Eliminar TODAS las tareas (una por una)
  const clearAll = async () => {
    try {
      // 🏆 PATRÓN AVANZADO: Promise.all para operaciones paralelas
      // 💡 Elimina todas las tareas simultáneamente en lugar de secuencialmente
      // ✅ EXCELENTE: Mucho más rápido que un loop con await
      const deletePromises = tasks.map((task) =>
        fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
          method: "DELETE",
        })
      );

      await Promise.all(deletePromises); // ✅ Espera a que TODAS terminen
      // ✅ BIEN: Re-fetch aquí SÍ tiene sentido (no sabemos qué se eliminó)
      await getTasks();
    } catch (error) {
      console.error("Error eliminando todas:", error);
    }
  };

  // ✅ PATRÓN POSITIVO PERFECTO: Inicialización async en useEffect
  useEffect(() => {
    // 💡 Wrapper function porque useEffect no puede ser async directamente
    const init = async () => {
      await createUserIfNeeded(); // ✅ Secuencia lógica: usuario primero
      await getTasks();           // ✅ Luego sus tareas
    };
    init();
  }, []); // ✅ PERFECTO: [] = solo ejecutar una vez al montar componente

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
        {/* ✅ PATRÓN POSITIVO: key={task.id} (ID de la API, no index) */}
        {tasks.map((task) => (
          <li key={task.id}>
            {task.label}
            {/* ⚠️ OPORTUNIDAD: Podrías usar task.is_done para marcar completadas */}
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              X
            </button>
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
