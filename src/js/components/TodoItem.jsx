import React from "react";

const TodoItem = ({
    item,
    handleDelete,
    handleToggleComplete,
    isEditing,
    editingText,
    setEditingText,
    startEditingTask,
    saveEditedTask,
    handleEditKeyDown
}) => {
    return (
        <li className="todo-item">
            <button
                className={`complete-btn ${item.completed ? "is-completed" : ""}`}
                onClick={() => handleToggleComplete(item.id)}
                aria-label={item.completed ? "Marcar como pendiente" : "Marcar como completada"}
            >
                {item.completed ? "✓" : "○"}
            </button>

            {isEditing ? (
                <input
                    className="edit-input"
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    onKeyDown={handleEditKeyDown}
                    onBlur={saveEditedTask}
                    autoFocus
                />
            ) : (
                <span className={`task-text ${item.completed ? "completed" : ""}`}>
                    {item.text}
                </span>
            )}

            <div className="actions">
                {isEditing ? (
                    <button className="icon-btn save-btn" onClick={saveEditedTask}>
                        💾
                    </button>
                ) : (
                    <button className="icon-btn edit-btn" onClick={() => startEditingTask(item)}>
                        ✏️
                    </button>
                )}

                <button className="icon-btn delete-btn" onClick={() => handleDelete(item.id)}>
                    ✖
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
