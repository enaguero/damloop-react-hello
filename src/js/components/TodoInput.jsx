import React from "react";

const TodoInput = ({ task, setTask, handleKeyDown, tasks = [] }) => {
    const placeholder =
        tasks.length === 0
            ? "✨ Añade tu primera tarea, bro..."
            : "Escribe tu rima… y que la tarea se arrime";

    return (
        <input
            className="todo-input modern-input"
            type="text"
            placeholder={placeholder}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
};

export default TodoInput;
