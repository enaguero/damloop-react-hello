import React from "react";
import ReactDOM from "react-dom/client";

// Bootstrap (opcional)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Estilos
import "../styles/index.css";

// Componente principal
import TrafficLight from "./components/TrafficLight.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <TrafficLight />
    </React.StrictMode>
);
