import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Contexto from '../context/Contexto.jsx';

export default function Proveedores() {
  const { usuario } = useContext(Contexto);
  const token = typeof usuario === "string" ? usuario : usuario.token;

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [datos, setDatos] = useState([]);
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const headers = {
    headers: {
      Autorizacion: "Back " + token
    }
  };

  const limpiarCampos = () => {
    setNombre("");
    setTelefono("");
    setEmail("");
    setModoEdicion(false);
  };

  const mostrar = async () => {
    if (mostrarDatos) {
      setMostrarDatos(false);
      return;
    }

    try {
      const respuesta = await axios.get("http://localhost:3001/Proveedores", headers);
      setDatos(respuesta.data);
      setMostrarDatos(true);
    } catch (error) {
      Swal.fire("Error", "No se pudo cargar la lista de proveedores", "error");
    }
  };

  const insertar = async () => {
    if (!nombre || !telefono || !email) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    try {
      await axios.post("http://localhost:3001/insercion_Provedores", {
        nombre,
        telefono,
        email
      }, headers);

      Swal.fire("Insertado", "Proveedor agregado correctamente", "success");
      mostrar();
      limpiarCampos();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.error || "No se pudo insertar el proveedor", "error");
    }
  };

  const actualizar = async () => {
    if (!nombre || !telefono || !email) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/actualizar_Proveedores/${nombre}`, {
        telefono,
        email
      }, headers);

      Swal.fire("Actualizado", "Proveedor actualizado correctamente", "success");
      mostrar();
      limpiarCampos();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.error || "No se pudo actualizar el proveedor", "error");
    }
  };

  const eliminar = async (nombreProveedor) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás al proveedor "${nombreProveedor}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:3001/eliminar_Proveedores/${nombreProveedor}`, headers);
      Swal.fire("Eliminado", "Proveedor eliminado correctamente", "success");
      mostrar();
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el proveedor", "error");
    }
  };
})
  }


  const cargarParaActualizar = (prov) => {
    setNombre(prov.nombre);
    setTelefono(prov.telefono);
    setEmail(prov.email);
    setModoEdicion(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Gestión de Proveedores</h2>

      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type='number'
            className="form-control"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={modoEdicion ? actualizar : insertar}>
          {modoEdicion ? "Actualizar" : "Guardar"}
        </button>
        <button className="btn btn-secondary" onClick={mostrar}>
          {mostrarDatos ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {mostrarDatos && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((prov, i) => (
              <tr key={i}>
                <td>{prov.nombre}</td>
                <td>{prov.telefono}</td>
                <td>{prov.email}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => cargarParaActualizar(prov)}>Actualizar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminar(prov.nombre)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
