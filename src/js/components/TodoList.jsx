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
        return <li className="empty">No hay tareas, añade una para empezar</li>;
    }

    return (
        <ul className="todo-list">
            {tasks.map((taskItem) => (
                <TodoItem
                    key={taskItem.id}
                    item={taskItem}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                    editingId={editingId}
                    editText={editText}
                    setEditText={setEditText}
                    handleStartEdit={handleStartEdit}
                    handleSaveEdit={handleSaveEdit}
                />
            ))}
        </ul>
    );
};

export default TodoList;
