import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./TodoList.jsx";

const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const createTaskId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const normalizeTasks = (parsedTasks) => {
        if (!Array.isArray(parsedTasks)) return [];

        return parsedTasks
            .map((taskItem, index) => {
                if (typeof taskItem === "string") {
                    const trimmedLegacyTask = taskItem.trim();
                    if (!trimmedLegacyTask) return null;

                    return {
                        id: `legacy-${index}-${createTaskId()}`,
                        text: trimmedLegacyTask,
                        completed: false
                    };
                }

                if (!taskItem || typeof taskItem !== "object") return null;

                const text = typeof taskItem.text === "string" ? taskItem.text.trim() : "";
                if (!text) return null;

                return {
                    id: taskItem.id || `task-${index}-${createTaskId()}`,
                    text,
                    completed: Boolean(taskItem.completed)
                };
            })
            .filter(Boolean);
    };

    // Cargar tareas desde localStorage al iniciar
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (!savedTasks) {
            setIsHydrated(true);
            return;
        }

        try {
            const parsedTasks = JSON.parse(savedTasks);
            setTasks(normalizeTasks(parsedTasks));
        } catch {
            setTasks([]);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    // Guardar tareas en localStorage cuando cambien
    useEffect(() => {
        if (!isHydrated) return;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks, isHydrated]);

    const addTask = () => {
        const trimmedTask = task.trim();
        if (trimmedTask === "") {
            setErrorMessage("La tarea no puede estar vacía.");
            return;
        }

        const newTask = {
            id: createTaskId(),
            text: trimmedTask,
            completed: false
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTask("");
        setErrorMessage("");
    };

    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") addTask();
    };

    const handleDelete = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((taskItem) => taskItem.id !== taskId));
    };

    const handleToggleComplete = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((taskItem) =>
                taskItem.id === taskId
                    ? { ...taskItem, completed: !taskItem.completed }
                    : taskItem
            )
        );
    };

    const startEditingTask = (taskItem) => {
        setEditingTaskId(taskItem.id);
        setEditingText(taskItem.text);
        setErrorMessage("");
    };

    const cancelEditingTask = () => {
        setEditingTaskId(null);
        setEditingText("");
    };

    const saveEditedTask = () => {
        if (!editingTaskId) return;

        const trimmedTask = editingText.trim();
        if (trimmedTask === "") {
            setErrorMessage("El texto editado no puede estar vacío.");
            return;
        }

        setTasks((prevTasks) =>
            prevTasks.map((taskItem) =>
                taskItem.id === editingTaskId
                    ? { ...taskItem, text: trimmedTask }
                    : taskItem
            )
        );

        cancelEditingTask();
        setErrorMessage("");
    };

    const handleEditKeyDown = (event) => {
        if (event.key === "Enter") saveEditedTask();
        if (event.key === "Escape") cancelEditingTask();
    };

    const completedCount = tasks.filter((taskItem) => taskItem.completed).length;

    return (
        <div className="app-container">

            <h1 className="title">
                🔥 Damián’s TodoList
                <span className="subtitle">Organiza tu día como un pro</span>
            </h1>

            <div className="todo-box">
                <TodoInput
                    task={task}
                    setTask={setTask}
                    handleKeyDown={handleInputKeyDown}
                    addTask={addTask}
                    tasks={tasks}
                    errorMessage={errorMessage}
                    clearError={() => setErrorMessage("")}
                />

                <ul className="todo-list">
                    <TodoList
                        tasks={tasks}
                        handleDelete={handleDelete}
                        handleToggleComplete={handleToggleComplete}
                        editingTaskId={editingTaskId}
                        editingText={editingText}
                        setEditingText={setEditingText}
                        startEditingTask={startEditingTask}
                        saveEditedTask={saveEditedTask}
                        handleEditKeyDown={handleEditKeyDown}
                    />
                </ul>

                <div className="footer">
                    {tasks.length === 0
                        ? "Sin tareas pendientes"
                        : `${tasks.length} tarea${tasks.length !== 1 ? "s" : ""} total(es) · ${completedCount} completada${completedCount !== 1 ? "s" : ""}`}
                </div>
            </div>
        </div>
    );
};

export default Home;
