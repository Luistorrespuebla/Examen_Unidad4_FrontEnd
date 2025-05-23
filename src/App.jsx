import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Error from './pages/Error';
import Muebles from './pages/Muebles';
import Proveedores from './pages/Proveedores';
import Vendedores from './pages/Vendedores';
import RegistroUsuarios from './pages/RegistroUsuarios';
import Inicio from './pages/Inicio';
import RutasPrivadas from './routes/RutasPrivadas';
import RutasPublicas from './routes/RutasPublicas';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RutasPublicas><Login /></RutasPublicas>} />
      <Route path="/login" element={<RutasPublicas><Login /></RutasPublicas>} /> 
      <Route path="/inicio" element={<RutasPrivadas><Inicio /></RutasPrivadas>} />
      <Route path="/registro" element={<RutasPublicas><Registro /></RutasPublicas>} />
      <Route path="/muebles" element={<RutasPrivadas><Muebles /></RutasPrivadas>} />
      <Route path="/proveedores" element={<RutasPrivadas><Proveedores /></RutasPrivadas>} />
      <Route path="/vendedores" element={<RutasPrivadas><Vendedores /></RutasPrivadas>} />
      <Route path="/usuarios" element={<RutasPrivadas><RegistroUsuarios /></RutasPrivadas>} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;

