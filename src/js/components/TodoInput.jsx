import React from "react";

const TodoInput = ({
    task,
    setTask,
    handleKeyDown,
    addTask,
    tasks,
    errorMessage,
    clearError
}) => {
    return (
        <div className="todo-input-wrapper">
            <input
                className="todo-input"
                type="text"
                placeholder={
                    tasks.length === 0
                        ? "Añade tu primera tarea..."
                        : "Escribe y presiona Enter"
                }
                value={task}
                onChange={(event) => {
                    setTask(event.target.value);
                    if (errorMessage) clearError();
                }}
                onKeyDown={handleKeyDown}
            />

            <button className="add-btn" onClick={addTask}>
                Agregar
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default TodoInput;
