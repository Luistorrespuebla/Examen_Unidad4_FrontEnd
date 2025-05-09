import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import Header from '../components/Header';
import Nav from "../components/Nav";
import Footer from '../components/Footer';
import EffectMuebles from '../components/EffectMuebles';


const Muebles = () => {
  return (
    <>
      <Nav/>
      <Header/>
      <EffectMuebles/>
      <Footer />
    </>
  );
};

export default Muebles;