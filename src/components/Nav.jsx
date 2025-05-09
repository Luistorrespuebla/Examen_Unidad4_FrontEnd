import { useContext } from 'react';
import Contexto from '../context/Contexto';
import { NavLink, useNavigate } from 'react-router-dom';

const Nav = () => {
  const { cerrar_sesion, usuario } = useContext(Contexto);
  const navegacion = useNavigate();

  console.log('🚀 [Nav] usuario desde Contexto: ', usuario); // Verifica el estado de usuario

  const finalizar_sesion = () => {
    cerrar_sesion();
    navegacion("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#3B2222' }}>
      <div className="container-fluid">
        <span className="navbar-brand text-white fw-semibold">Es un placer atenderte!!</span>

        <div className="collapse navbar-collapse justify-content-between">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {usuario && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/inicio">Inicio</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/muebles">Muebles</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/proveedores">Proveedores</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/vendedores">Vendedores</NavLink>
                </li>
              </>
            )}
            {!usuario && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/registro">Registro</NavLink>
                </li>
              </>
            )}
          </ul>

          {usuario && (
            <div className="d-flex align-items-center">
              <span className="navbar-text text-white me-3">
                Bienvenido, {usuario.usuario}
              </span>
              <button className="btn btn-outline-light" onClick={finalizar_sesion}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
