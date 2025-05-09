import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Contexto from '../context/Contexto.jsx';

const Vendedores = () => {
  const { usuario } = useContext(Contexto);
  const token = typeof usuario === "string" ? usuario : usuario.token;

  const [vendedores, setVendedores] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', telefono: '', email: '' });
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombreOriginal, setNombreOriginal] = useState('');

  const headers = {
    headers: {
      Autorizacion: "Back " + token
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const limpiarCampos = () => {
    setFormulario({ nombre: '', telefono: '', email: '' });
    setModoEdicion(false);
    setNombreOriginal('');
  };

  const toggleMostrar = async () => {
    if (mostrarDatos) {
      setMostrarDatos(false);
      setVendedores([]);
    } else {
      try {
        const res = await axios.get("http://localhost:3001/Vendedores", headers);
        setVendedores(res.data);
        setMostrarDatos(true);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo obtener la lista de vendedores", "error");
      }
    }
  };

  const guardar = async () => {
    const { nombre, telefono, email } = formulario;

    if (!nombre || !telefono || !email) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    try {
      if (modoEdicion) {
        await axios.put(`http://localhost:3001/actualizar_Vendedores/${nombreOriginal}`, formulario, headers);
        Swal.fire("Actualizado", "Vendedor actualizado correctamente", "success");
      } else {
        await axios.post("http://localhost:3001/insercion_Vendedores", formulario, headers);
        Swal.fire("Guardado", "Vendedor guardado correctamente", "success");
      }

      limpiarCampos();
      toggleMostrar();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.response?.data?.error || "Ocurrió un error al guardar", "error");
    }
  };

  const eliminar = async (nombre) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás al vendedor "${nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/eliminar_Vendedores/${nombre}`, headers);
          Swal.fire("Eliminado", "Vendedor eliminado correctamente", "success");
          toggleMostrar();
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "No se pudo eliminar el vendedor", "error");
        }
      }
    });
  };

  const editar = (vendedor) => {
    setFormulario(vendedor);
    setModoEdicion(true);
    setNombreOriginal(vendedor.nombre);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Vendedores</h2>

      <div className="mb-3">
        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="Nombre"
            value={formulario.nombre}
            onChange={handleChange}
            style={{ minWidth: "200px" }}
          />
          <input
            type="number"
            className="form-control"
            name="telefono"
            placeholder="Teléfono"
            value={formulario.telefono}
            onChange={handleChange}
            style={{ minWidth: "200px" }}
          />
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={formulario.email}
            onChange={handleChange}
            style={{ minWidth: "200px" }}
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={guardar}>
            {modoEdicion ? "Actualizar" : "Guardar"}
          </button>
          <button className="btn btn-secondary" onClick={toggleMostrar}>
            {mostrarDatos ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>

      {mostrarDatos && (
        <table className="table table-bordered table-striped mt-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vendedores.map((vendedor) => (
              <tr key={vendedor._id}>
                <td>{vendedor.nombre}</td>
                <td>{vendedor.telefono}</td>
                <td>{vendedor.email}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editar(vendedor)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(vendedor.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Vendedores;
