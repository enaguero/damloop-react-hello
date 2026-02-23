import React, { useState } from "react";

const TodoItem = ({
    item,
    handleDelete,
    handleToggle,
    editingId,
    editText,
    setEditText,
    handleStartEdit,
    handleSaveEdit
}) => {
    const isEditing = editingId === item.id;

    return (
        <li className="todo-item">
            {/* Botón de completar */}
            <button
                className={`complete-btn ${item.completed ? "is-completed" : ""}`}
                onClick={() => handleToggle(item.id)}
            >
                {item.completed ? "✓" : "○"}
            </button>

            {/* Modo edición */}
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                    onBlur={handleSaveEdit}
                    autoFocus
                    className="edit-input"
                />
            ) : (
                <span
                    className={`task-text ${item.completed ? "completed" : ""}`}
                    onDoubleClick={() => handleStartEdit(item)}
                >
                    {item.text}
                </span>
            )}

            {/* Botón eliminar */}
            <span
                className="delete-icon"
                onClick={() => handleDelete(item.id)}
            >
                ✖
            </span>
        </li>
    );
};

export default TodoItem;
