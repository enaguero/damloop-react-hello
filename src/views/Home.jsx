import React from "react";
import Navbar from "../components/Navbar.jsx";
import Jumbotron from "../components/Jumbotron.jsx";
import Card from "../components/Card.jsx";
import Footer from "../components/Footer.jsx";

// ✅ PATRÓN POSITIVO: Vista componente que orquesta la composición
// Home es responsable de ensamblar los componentes más pequeños
const Home = () => {
  return (
    // ✅ PATRÓN POSITIVO: Uso de Fragment (<>) en lugar de div wrapper
    // Evita agregar nodos innecesarios al DOM
    <>
      <Navbar />

      {/* ✅ PATRÓN POSITIVO: Container de Bootstrap para responsive layout */}
      <div className="container mt-4">
        <Jumbotron />

        {/* ✅ PATRÓN POSITIVO: Row de Bootstrap para grid system */}
        <div className="row mt-4">
          {/* ✅ PATRÓN POSITIVO: Pasar props diferentes a cada Card */}
          {/* Esto demuestra la reutilización del componente Card */}
          <Card
            title="Bob Esponja"
            description="Cocinero estrella del Crustáceo Crujiente, siempre optimista y listo para una nueva aventura."
            imageUrl="https://yt3.googleusercontent.com/ytc/AGIKgqMEAK8H2twyTWYEMYvcZfvYT_ttU1nQI76WwmKd=s900-c-k-c0x00ffffff-no-rj"
          />

          <Card
            title="Patricio"
            description="El mejor amigo de Bob. Leal, divertido y experto en hacer… absolutamente nada."
            imageUrl="https://tse4.mm.bing.net/th/id/OIP.v-oHyjwoqUNGdi7DdEfCwAHaFp?w=600&h=458&rs=1&pid=ImgDetMain&o=7&rm=3"
          />

          <Card
            title="Calamardo"
            description="Vecino gruñón, artista frustrado y clarinetista apasionado. No soporta a Bob… pero en el fondo lo aprecia."
            imageUrl="https://tse1.explicit.bing.net/th/id/OIP.IPBNFP31ay1giwBPTci1WAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3g"
          />

          <Card
            title="Arenita"
            description="Científica, karateka y la ardilla más valiente bajo el mar. Inteligencia y fuerza en un solo personaje."
            imageUrl="https://tse3.mm.bing.net/th/id/OIP.-WZaH53bSMcl5stCeZfLEAHaIF?rs=1&pid=ImgDetMain&o=7&rm=3"
          />
          
          {/* 💡 SUGERENCIA OPCIONAL: Convertir esto a un array con .map() */}
          {/* Podrías crear un array de personajes y usar .map() para renderizarlos */}
          {/* Ver REVIEW.md para más detalles */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
