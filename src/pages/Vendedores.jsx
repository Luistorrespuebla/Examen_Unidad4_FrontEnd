import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import Header from '../components/Header';
import Nav from "../components/Nav";
import Footer from '../components/Footer';
import EffectVendedores from '../components/EffectVendedores';


const Vendedores = () => {
  return (
    <>
      <Nav/>
      <Header/>
      <EffectVendedores/>
      <Footer />
    </>
  );
};

export default Vendedores;