import React, { useState } from "react";
import Light from "./Light.jsx";

// ✅ PATRÓN POSITIVO: Componente con estado local
const TrafficLight = () => {
    // ✅ EXCELENTE: Dos estados independientes bien definidos
    const [colors, setColors] = useState(["red", "yellow", "green"]);
    const [activeColor, setActiveColor] = useState("red");

    // ✅ PATRÓN POSITIVO: Función para ciclar colores
    // Usa operador módulo (%) para volver al inicio automáticamente
    const cycleColors = () => {
        const index = colors.indexOf(activeColor);
        const next = (index + 1) % colors.length; // Módulo hace el ciclo
        setActiveColor(colors[next]);
    };

    // ✅ EXCELENTE: Agregar luz dinámicamente con validación
    const addPurple = () => {
        if (!colors.includes("purple")) {
            // ✅ Inmutabilidad: spread operator crea nuevo array
            setColors([...colors, "purple"]);
        }
    };

    return (
        <div className="traffic-container">
            <h1 className="title">🚦 Semáforo React</h1>
            <div className="traffic-light">
                {/* ⚠️ OPORTUNIDAD DE MEJORA: Usar index como key */}
                {/* El código original: key={i} */}
                {/* {colors.map((c, i) => (
                    <Light
                        key={i}
                        color={c}
                        active={activeColor === c}
                        onClick={() => setActiveColor(c)}
                    />
                ))} */}
                
                {/* ✅ CORRECCIÓN APLICADA: Usar color como key */}
                {colors.map((c) => (
                    <Light
                        key={c}  // ✅ Color es único y estable
                        color={c}
                        active={activeColor === c}
                        onClick={() => setActiveColor(c)}
                    />
                ))}
            </div>

            <button className="btn" onClick={cycleColors}>
                Cambiar color
            </button>

            <button className="btn purple" onClick={addPurple}>
                Añadir púrpura
            </button>
        </div>
    );
};

export default TrafficLight;
