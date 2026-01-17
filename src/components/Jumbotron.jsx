import React from "react";

const Jumbotron = () => {
  return (
    <header className="bg-light py-5 border-bottom mb-4">
      <div className="container text-center">
        <h1 className="fw-bold">¡Bienvenido a Fondo de Bikini!</h1>
        <p className="lead mb-4">
          Sumérgete en el mundo de Bob Esponja y sus amigos. Aventuras, risas y mucha diversión bajo el mar.
        </p>
        <a className="btn btn-primary btn-lg" href="#">
          Explorar personajes
        </a>
      </div>
    </header>
  );
};

export default Jumbotron;
