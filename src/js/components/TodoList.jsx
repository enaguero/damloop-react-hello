import React from "react";
import TodoItem from "./TodoItem.jsx";

const TodoList = ({ tasks, handleDelete }) => {
    if (tasks.length === 0) {
        return <li className="empty">No hay tareas, añadir tareas</li>;
    }

    return tasks.map((item, index) => (
        <TodoItem
            key={index}
            item={item}
            index={index}
            handleDelete={handleDelete}
        />
    ));
};

export default TodoList;
