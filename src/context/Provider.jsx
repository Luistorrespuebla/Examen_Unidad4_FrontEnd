import { useReducer, useEffect } from "react";
import Contexto from "./Contexto";
import types from "./types";
import MiReducer from "./Mireducer";

const inicio = () => {
  const sesion = localStorage.getItem("usuario");
  console.log('🚀 [Provider] sesion desde localStorage: ', sesion);

  return {
    logueado: !!sesion,
    usuario: sesion ? JSON.parse(sesion) : null
  };
};

const Provider = ({ children }) => {
  const [logeado, dispatch] = useReducer(MiReducer, {}, inicio);

  const login = (datos) => {
    const action = {
      type: types.login,
      usuario: datos
    };
    console.log('🚀 [Provider] login datos: ', datos);
    localStorage.setItem("usuario", JSON.stringify(datos));
    dispatch(action);
  };

  const cerrar_sesion = async () => {
    const sesion = localStorage.getItem("usuario");
    const usuario = sesion ? JSON.parse(sesion).usuario : null;

    if (usuario) {
      try {
        await fetch(`http://localhost:3001/logout/${usuario}`, {
          method: 'PUT'
        });
      } catch (error) {
        console.error("Error al cerrar sesión en el servidor:", error);
      }
    }

    const action = {
      type: types.logout,
      usuario: null
    };
    localStorage.removeItem("usuario");
    dispatch(action);
  };

  useEffect(() => {
    const sesion = localStorage.getItem("usuario");
    if (sesion) {
      dispatch({
        type: types.login,
        usuario: JSON.parse(sesion)
      });
    }
  }, []);

  return (
    <Contexto.Provider value={{ ...logeado, login, cerrar_sesion }}>
      {children}
    </Contexto.Provider>
  );
};

export default Provider;
