import React from "react";

const TodoInput = ({ task, setTask, handleKeyDown, tasks }) => {
    return (
        <input
            className="todo-input"
            type="text"
            placeholder={
                tasks.length === 0
                    ? "Añade tu primera tarea..."
                    : "Escribe y presiona Enter"
            }
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
};

export default TodoInput;
