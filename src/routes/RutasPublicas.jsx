import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Contexto from "../context/Contexto";

const RutasPublicas = ({ children }) => {
  const { usuario } = useContext(Contexto);
  return !usuario ? children : <Navigate to="/inicio" />;
};

export default RutasPublicas;


