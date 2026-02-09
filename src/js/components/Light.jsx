import React from "react";

// ✅ PATRÓN POSITIVO: Componente presentacional puro
// Recibe props y renderiza, sin lógica de negocio
const Light = ({ color, active, onClick }) => {
    return (
        <div
            // ✅ EXCELENTE: Template literals para clases dinámicas
            // Combina: clase base + color + estado activo
            className={`light ${color} ${active ? "active" : ""}`}
            // ✅ PATRÓN POSITIVO: Event handler como prop
            onClick={onClick}
        ></div>
    );
};

export default Light;
