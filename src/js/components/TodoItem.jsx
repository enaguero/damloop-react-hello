import React from "react";

const TodoItem = ({ item, index, handleDelete }) => {
    return (
        <li className="todo-item">
            <span>{item}</span>
            <span className="delete-icon" onClick={() => handleDelete(index)}>
                ✖
            </span>
        </li>
    );
};

export default TodoItem;
