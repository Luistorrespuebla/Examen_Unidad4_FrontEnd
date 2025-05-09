import { useReducer, useEffect } from "react";
import Contexto from "./Contexto";
import types from "./types";
import MiReducer from "./Mireducer";

const inicio = () => {
  const sesion = localStorage.getItem("usuario");
  console.log('🚀 [Provider] sesion desde localStorage: ', sesion);

  return {
    logueado: !!sesion,
    usuario: sesion ? JSON.parse(sesion) : null // Asegúrate de que el usuario sea null si no hay datos
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
    localStorage.setItem("usuario", JSON.stringify(datos)); // Guarda el usuario en localStorage
    dispatch(action);
  };

  const cerrar_sesion = () => {
    const action = {
      type: types.logout,
      usuario: null
    };
    localStorage.removeItem("usuario"); // Elimina el usuario del localStorage
    dispatch(action);
  };

  useEffect(() => {
    // Este useEffect solo debe ejecutarse una vez para sincronizar el estado inicial
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
