import React from "react";

const Error = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div className="text-center">
        <h1 className="display-1">Error 404</h1>
        <p className="lead">Página no encontrada</p>
        <hr />
        <p>
          La página que buscas no existe. Por favor, regresa a la página de inicio.
        </p>
        <a href="/" className="btn btn-primary">
          Regresar al inicio
        </a>
      </div>
    </div>
  );
};

export default Error;
