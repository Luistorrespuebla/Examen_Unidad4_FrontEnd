import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Main_Registro = () => {
  const [formulario, setFormulario] = useState({
    usuario: '',
    password: '',
    rol: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const guardar = async () => {
    const { usuario, password, rol } = formulario;

    if (!usuario || !password || !rol) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas registrar este nuevo usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, registrar",
      cancelButtonText: "Cancelar"
    });

    if (!confirmacion.isConfirmed) {
      return;
    }

    try {
      await axios.post("http://localhost:3001/registro", formulario);
      Swal.fire("Registrado", "Usuario registrado correctamente", "success").then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.response?.data?.msj || "No se pudo registrar el usuario", "error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">Registro de nuevo usuario</h2>

        <input
          type="text"
          className="form-control mb-3"
          name="usuario"
          placeholder="Usuario"
          value={formulario.usuario}
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-3"
          name="password"
          placeholder="Contraseña"
          value={formulario.password}
          onChange={handleChange}
        />

        <input
          type="text"
          className="form-control mb-3"
          name="rol"
          placeholder="Rol (1 para admin, 2 para usuario)"
          value={formulario.rol}
          onChange={handleChange}
        />

        <div className="d-flex flex-column gap-2">
          <button className="btn btn-primary" onClick={guardar}>
            Registrar
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Volver al Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main_Registro;
