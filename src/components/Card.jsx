import React from "react";

// ✅ PATRÓN POSITIVO: Uso correcto de destructuring de props
// Recibir title, description, imageUrl como props hace el componente reutilizable
const Card = ({ title, description, imageUrl }) => {
  return (
    // ✅ PATRÓN POSITIVO: Grid responsivo de Bootstrap
    // col-lg-3 = 4 columnas en desktop, col-md-6 = 2 columnas en tablet
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card h-100">
        {/* ✅ PATRÓN POSITIVO: alt dinámico usando prop title */}
        <img src={imageUrl} className="card-img-top" alt={title} />
        <div className="card-body">
          {/* ✅ PATRÓN POSITIVO: Renderizado dinámico del título */}
          <h5 className="card-title">{title}</h5>
          
          {/* ❌ ANTI-PATRÓN CRÍTICO: No usar prop description */}
          {/* El código original tenía Lorem Ipsum hardcodeado: */}
          {/* <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explicabo magni sapiente, tempore debitis beatae culpa natus architecto.
          </p> */}
          
          {/* ✅ CORRECCIÓN APLICADA: Usar la prop description */}
          {/* Ahora cada Card muestra su propia descripción personalizada */}
          <p className="card-text">{description}</p>
        </div>
        <div className="card-footer text-center">
          <a href="#" className="btn btn-primary">Find Out More!</a>
        </div>
      </div>
    </div>
  );
};

export default Card;

