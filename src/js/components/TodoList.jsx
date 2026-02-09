import React from "react";
import TodoItem from "./TodoItem.jsx";

// ✅ PATRÓN POSITIVO: Componente presentacional con renderizado condicional
const TodoList = ({ tasks, handleDelete }) => {
    // ✅ EXCELENTE: Manejo de lista vacía (edge case)
    if (tasks.length === 0) {
        return <li className="empty">No hay tareas, añadir tareas</li>;
    }

    // ⚠️ OPORTUNIDAD DE MEJORA: Usar index como key
    // El código original usa index, que no es ideal
    // Ver REVIEW.md para cómo usar IDs únicos en su lugar
    return tasks.map((item, index) => (
        <TodoItem
            key={index}  // ⚠️ Cambiar a key={item.id} cuando uses objetos
            item={item}
            index={index}
            handleDelete={handleDelete}
        />
    ));
};

export default TodoList;
