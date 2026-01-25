import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./TodoList.jsx";

const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    // Cargar tareas desde localStorage al iniciar
    useEffect(() => {
        const saved = localStorage.getItem("tasks");
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    // Guardar tareas en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && task.trim() !== "") {
            setTasks([...tasks, task.trim()]);
            setTask("");
        }
    };

    const handleDelete = (indexToDelete) => {
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };

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
                    handleKeyDown={handleKeyDown}
                    tasks={tasks}
                />

                <ul className="todo-list">
                    <TodoList tasks={tasks} handleDelete={handleDelete} />
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
