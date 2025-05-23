import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


import Nav from "../components/Nav";
import Footer from '../components/Footer';
import EffectUsuarios from '../components/EffectUsuarios';
import Header from '../components/Header';

const RegistroUsuarios = () => {
  return (
    <>
      <Nav/>
      <Header/>
      <EffectUsuarios/>
      <Footer />
    </>
  );
};

export default RegistroUsuarios;