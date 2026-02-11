import React from "react";
import TodoItem from "./TodoItem.jsx";

const TodoList = ({
    tasks,
    handleDelete,
    handleToggle,
    editingId,
    editText,
    setEditText,
    handleStartEdit,
    handleSaveEdit
}) => {
    if (tasks.length === 0) {
        return <li className="empty">No hay tareas, añadir tareas</li>;
    }

    return (
        <>
            {tasks.map((item) => (
                <TodoItem
                    key={item.id}
                    item={item}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                    editingId={editingId}
                    editText={editText}
                    setEditText={setEditText}
                    handleStartEdit={handleStartEdit}
                    handleSaveEdit={handleSaveEdit}
                />
            ))}
        </>
    );
};

export default TodoList;
