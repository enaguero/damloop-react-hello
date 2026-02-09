import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./TodoList.jsx";

// ✅ PATRÓN POSITIVO: Componente contenedor con toda la lógica
const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    // ✅ EXCELENTE: localStorage implementado correctamente (BONUS +5 pts)
    // useEffect con dependencias [] se ejecuta solo al montar el componente
    useEffect(() => {
        const saved = localStorage.getItem("tasks");
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    // ✅ EXCELENTE: Guardar automáticamente cuando tasks cambia
    // useEffect con dependencia [tasks] se ejecuta cada vez que tasks cambia
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // ✅ PATRÓN POSITIVO: Validación con .trim()
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && task.trim() !== "") {
            // ✅ EXCELENTE: Spread operator mantiene inmutabilidad
            setTasks([...tasks, task.trim()]);
            setTask("");
        }
    };

    // ✅ EXCELENTE: .filter() mantiene inmutabilidad
    const handleDelete = (indexToDelete) => {
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };
    
    // ⚠️ FUNCIONALIDADES FALTANTES (ver REVIEW.md):
    // TODO: Implementar handleToggle para completar/descompletar tareas (-10 pts)
    // TODO: Implementar handleStartEdit y handleSaveEdit para editar tareas (-10 pts)
    // TODO: Cambiar de array de strings a array de objetos con {id, text, completed}

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
