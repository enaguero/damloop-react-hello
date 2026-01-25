import React from "react";

const Light = ({ color, active, onClick }) => {
    return (
        <div
            className={`light ${color} ${active ? "active" : ""}`}
            onClick={onClick}
        ></div>
    );
};

export default Light;
