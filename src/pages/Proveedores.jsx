import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


import Nav from "../components/Nav";
import Footer from '../components/Footer';
import EffectProveedores from '../components/EffectProveedores';
import Header from '../components/Header';

const Proveedores = () => {
  return (
    <>
      <Nav/>
        <Header/>
      <EffectProveedores/>
      <Footer />
    </>
  );
};

export default Proveedores;