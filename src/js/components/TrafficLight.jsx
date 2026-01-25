import React, { useState } from "react";
import Light from "./Light.jsx";

const TrafficLight = () => {
    const [colors, setColors] = useState(["red", "yellow", "green"]);
    const [activeColor, setActiveColor] = useState("red");

    const cycleColors = () => {
        const index = colors.indexOf(activeColor);
        const next = (index + 1) % colors.length;
        setActiveColor(colors[next]);
    };

    const addPurple = () => {
        if (!colors.includes("purple")) {
            setColors([...colors, "purple"]);
        }
    };

    return (
        <div className="traffic-container">
            <h1 className="title">🚦 Semáforo React</h1>
            <div className="traffic-light">
                {colors.map((c, i) => (
                    <Light
                        key={i}
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
