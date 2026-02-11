import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./TodoList.jsx";

const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    // Cargar desde localStorage
    useEffect(() => {
        const saved = localStorage.getItem("tasks");
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    // Guardar en localStorage
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Agregar tarea
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && task.trim() !== "") {
            setTasks([
                ...tasks,
                {
                    id: crypto.randomUUID(),
                    text: task.trim(),
                    completed: false
                }
            ]);
            setTask("");
        }
    };

    // Eliminar tarea
    const handleDelete = (idToDelete) => {
        setTasks(tasks.filter(task => task.id !== idToDelete));
    };

    // Completar tarea
    const handleToggle = (idToToggle) => {
        setTasks(
            tasks.map(task =>
                task.id === idToToggle
                    ? { ...task, completed: !task.completed }
                    : task
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
        if (editText.trim() === "") return;

        setTasks(
            tasks.map(task =>
                task.id === editingId
                    ? { ...task, text: editText.trim() }
                    : task
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
                    tasks={tasks}
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
