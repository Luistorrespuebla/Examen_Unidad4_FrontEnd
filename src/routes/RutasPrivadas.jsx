import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Contexto from "../context/Contexto";

const RutasPrivadas = ({ children }) => {
  const { usuario } = useContext(Contexto);
  return usuario ? children : <Navigate to="/login" />;
};

export default RutasPrivadas;


