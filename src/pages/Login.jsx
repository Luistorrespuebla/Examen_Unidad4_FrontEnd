import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { useNavigate } from 'react-router-dom';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Main_Login from '../components/Main_Login';
import Footer from '../components/Footer';
import Contexto from '../context/Contexto';

const Login = () => {
  const { login } = useContext(Contexto); 
  const navigate = useNavigate(); 

  const handleLogin = () => {
    login(); 
    navigate('/inicio'); 
  };

  return (
    <>
      <Nav />
      <Header />
      <Main_Login />
      <Footer />
    </>
  );
};

export default Login;
