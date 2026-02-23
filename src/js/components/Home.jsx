import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./TodoList.jsx";

const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isHydrated, setIsHydrated] = useState(false);

    // Cargar desde localStorage (HIDRATACIÓN SEGURA)
    useEffect(() => {
        const saved = localStorage.getItem("tasks");
        if (saved) {
            setTasks(JSON.parse(saved));
        }
        setIsHydrated(true);
    }, []);

    // Guardar en localStorage SOLO después de hidratar
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks, isHydrated]);

    // Crear ID único
    const createTaskId = () => crypto.randomUUID();

    // Agregar tarea
    const handleKeyDown = (e) => {
        if (e.key !== "Enter") return;

        const trimmed = task.trim();
        if (trimmed === "") {
            setErrorMessage("La tarea no puede estar vacía.");
            return;
        }

        const newTask = {
            id: createTaskId(),
            text: trimmed,
            completed: false
        };

        setTasks((prev) => [...prev, newTask]);
        setTask("");
        setErrorMessage("");
    };

    // Eliminar tarea
    const handleDelete = (idToDelete) => {
        setTasks((prev) => prev.filter((t) => t.id !== idToDelete));
    };

    // Completar tarea
    const handleToggle = (idToToggle) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === idToToggle ? { ...t, completed: !t.completed } : t
            )
        );
    };

    // Iniciar edición
    const handleStartEdit = (task) => {
        setEditingId(task.id);
        setEditText(task.text);
    };

    // Guardar edición
    const handleSaveEdit = () => {
        const trimmed = editText.trim();
        if (trimmed === "") return;

        setTasks((prev) =>
            prev.map((t) =>
                t.id === editingId ? { ...t, text: trimmed } : t
            )
        );

        setEditingId(null);
        setEditText("");
    };

    return (
        <div className="app-container">
            <h1 className="title">
                🔥 Ey bro, tu que aquí has aterrizao…
                <span className="subtitle">
                    suelta tu tarea, que aquí se queda guardao.
                </span>
            </h1>

            <div className="todo-box">
                <TodoInput
                    task={task}
                    setTask={setTask}
                    handleKeyDown={handleKeyDown}
                    errorMessage={errorMessage}
                />

                <ul className="todo-list">
                    <TodoList
                        tasks={tasks}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                        editingId={editingId}
                        editText={editText}
                        setEditText={setEditText}
                        handleStartEdit={handleStartEdit}
                        handleSaveEdit={handleSaveEdit}
                    />
                </ul>

                <div className="footer">
                    {tasks.length === 0
                        ? "Sin tareas pendientes"
                        : `${tasks.length} tarea${tasks.length !== 1 ? "s" : ""} pendiente${tasks.length !== 1 ? "s" : ""}`}
                </div>
            </div>
        </div>
    );
};

export default Home;
