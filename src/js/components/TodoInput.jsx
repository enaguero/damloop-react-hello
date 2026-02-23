import React from "react";

const TodoInput = ({ task, setTask, handleKeyDown, errorMessage }) => {
    return (
        <div className="todo-input-container">
            <input
                className="todo-input modern-input"
                type="text"
                placeholder="Escribe una tarea..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}
        </div>
    );
};

export default TodoInput;

