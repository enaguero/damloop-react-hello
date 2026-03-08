import React from "react";

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
                type="button"
                className={`complete-btn ${item.completed ? "is-completed" : ""}`}
                onClick={() => handleToggle(item.id)}
                aria-label={
                    item.completed
                        ? `Marcar ${item.text} como pendiente`
                        : `Marcar ${item.text} como completada`
                }
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
                    title="Haz doble click para editar"
                >
                    {item.text}
                </span>
            )}

            {/* Botón eliminar */}
            <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
                aria-label={`Eliminar tarea ${item.text}`}
            >
                ✖
            </button>
        </li>
    );
};

export default TodoItem;
