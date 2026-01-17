import React from "react";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card h-100">
        <img src={imageUrl} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explicabo magni sapiente, tempore debitis beatae culpa natus architecto.
          </p>
        </div>
        <div className="card-footer text-center">
          <a href="#" className="btn btn-primary">Find Out More!</a>
        </div>
      </div>
    </div>
  );
};

export default Card;

