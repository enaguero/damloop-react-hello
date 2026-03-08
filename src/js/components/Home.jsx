import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./TodoList.jsx";

function loadSavedTasks() {
    try {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
        localStorage.removeItem("tasks");
        return [];
    }
}

const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setTasks(loadSavedTasks());
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks, isHydrated]);

    const createTaskId = () => crypto.randomUUID();
    const pendingTasksCount = tasks.filter((taskItem) => !taskItem.completed).length;

    const handleTaskChange = (value) => {
        setTask(value);

        if (errorMessage && value.trim() !== "") {
            setErrorMessage("");
        }
    };

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

    const handleDelete = (idToDelete) => {
        setTasks((prev) => prev.filter((t) => t.id !== idToDelete));
    };

    const handleToggle = (idToToggle) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === idToToggle ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const handleStartEdit = (task) => {
        setEditingId(task.id);
        setEditText(task.text);
    };

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
                    setTask={handleTaskChange}
                    handleKeyDown={handleKeyDown}
                    errorMessage={errorMessage}
                />

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

                <div className="footer">
                    {pendingTasksCount === 0
                        ? "Sin tareas pendientes"
                        : `${pendingTasksCount} tarea${pendingTasksCount !== 1 ? "s" : ""} pendiente${pendingTasksCount !== 1 ? "s" : ""}`}
                </div>
            </div>
        </div>
    );
};

export default Home;
