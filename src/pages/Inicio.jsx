import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import bienvenido from '../assets/bienvenido.gif';
import Header from '../components/Header';
import Nav from "../components/Nav";
import Footer from '../components/Footer';

const Inicio = () => {
  return (
    <>
      <Nav />
      <Header />
      <div className="bg-dark text-white d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <img 
          src={bienvenido} 
          alt="Logo mueblería" 
          width="550" 
          height="550" 
          className="img-fluid"
        />
      </div>
      <Footer />
    </>
  );
};

export default Inicio;
