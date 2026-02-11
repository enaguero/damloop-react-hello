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
    return (
        <li className="todo-item">
            {editingId === item.id ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                    onBlur={handleSaveEdit}
                    autoFocus
                    className="modern-input"
                />
            ) : (
                <>
                    <span
                        onClick={() => handleToggle(item.id)}
                        onDoubleClick={() => handleStartEdit(item)}
                        className={item.completed ? "completed" : ""}
                    >
                        {item.text}
                    </span>

                    <span
                        className="delete-icon"
                        onClick={() => handleDelete(item.id)}
                    >
                        ✖
                    </span>
                </>
            )}
        </li>
    );
};

export default TodoItem;

