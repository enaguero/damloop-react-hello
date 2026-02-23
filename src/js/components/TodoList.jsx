import React from "react";
import TodoItem from "./TodoItem.jsx";

const TodoList = ({
    tasks,
    handleDelete,
    handleToggleComplete,
    editingTaskId,
    editingText,
    setEditingText,
    startEditingTask,
    saveEditedTask,
    handleEditKeyDown
}) => {
    if (tasks.length === 0) {
        return <li className="empty">No hay tareas, añadir tareas</li>;
    }

    return tasks.map((taskItem) => (
        <TodoItem
            key={taskItem.id}
            item={taskItem}
            handleDelete={handleDelete}
            handleToggleComplete={handleToggleComplete}
            isEditing={editingTaskId === taskItem.id}
            editingText={editingText}
            setEditingText={setEditingText}
            startEditingTask={startEditingTask}
            saveEditedTask={saveEditedTask}
            handleEditKeyDown={handleEditKeyDown}
        />
    ));
};

export default TodoList;
