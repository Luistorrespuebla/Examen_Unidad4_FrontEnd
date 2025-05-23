import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Contexto from '../context/Contexto.jsx';

const RegistroUsuarios = () => {
  const { usuario } = useContext(Contexto);
  const token = typeof usuario === 'string' ? usuario : usuario.token;

  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({
    usuario: '',
    password: '',
    rol: '',
    estado: ''
  });
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombreOriginal, setNombreOriginal] = useState('');

  const headers = {
    headers: {
      Autorizacion: 'Back ' + token
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const limpiarCampos = () => {
    setFormulario({
      usuario: '',
      password: '',
      rol: '',
      estado: ''
    });
    setModoEdicion(false);
    setNombreOriginal('');
  };

  const toggleMostrar = async () => {
    if (mostrarDatos) {
      setMostrarDatos(false);
      setUsuarios([]);
    } else {
      try {
        console.log("🔄 Solicitando lista de usuarios...");
        const res = await axios.get('http://localhost:3001/Usuarios', headers);
        console.log("✅ Usuarios obtenidos:", res.data);
        setUsuarios(res.data);
        setMostrarDatos(true);
      } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        Swal.fire('Error', 'No se pudo obtener la lista de usuarios', 'error');
      }
    }
  };

  const guardar = async () => {
    const { usuario: user, password, rol, estado } = formulario;

    if (!user || !password || !rol || !estado) {
      Swal.fire('Campos incompletos', 'Todos los campos son obligatorios', 'warning');
      return;
    }

    try {
      if (modoEdicion) {
        console.log("✏️ Enviando datos para actualizar usuario:", formulario);
        await axios.put(`http://localhost:3001/actualizar_Usuarios/${nombreOriginal}`, formulario, headers);
        Swal.fire('Actualizado', 'Usuario actualizado correctamente', 'success');
      } else {
        console.log("🆕 Enviando datos para crear usuario:", formulario);
        await axios.post('http://localhost:3001/insercion_Usuarios', formulario, headers);
        Swal.fire('Guardado', 'Usuario guardado correctamente', 'success');
      }
      limpiarCampos();
      toggleMostrar();
    } catch (error) {
      console.error("💥 Error al guardar usuario:", error);
      Swal.fire('Error', error.response?.data?.error || 'Ocurrió un error al guardar', 'error');
    }
  };

  const eliminar = async (nombreUsuario) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás al usuario "${nombreUsuario}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(`🗑️ Eliminando usuario: ${nombreUsuario}`);
          await axios.delete(`http://localhost:3001/eliminar_Usuarios/${nombreUsuario}`, headers);
          Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
          toggleMostrar();
        } catch (error) {
          console.error("❌ Error al eliminar usuario:", error);
          Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
        }
      }
    });
  };

  const editar = (usuarioObj) => {
    console.log("✏️ Usuario seleccionado para editar:", usuarioObj);
    setFormulario({
      usuario: usuarioObj.usuario,
      password: usuarioObj.password,
      rol: usuarioObj.rol,
      estado: usuarioObj.estado
    });
    setModoEdicion(true);
    setNombreOriginal(usuarioObj.usuario);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Usuarios</h2>

      <div className="mb-3">
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <input
            type="text"
            className="form-control"
            name="usuario"
            placeholder="Usuario"
            value={formulario.usuario}
            onChange={handleChange}
            style={{ minWidth: '200px' }}
          />
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={formulario.password}
            onChange={handleChange}
            style={{ minWidth: '200px' }}
          />
          <input
            type="number"
            className="form-control"
            name="rol"
            placeholder="Rol: 1 para administrador, 2 para usuario"
            value={formulario.rol}
            onChange={handleChange}
            style={{ minWidth: '200px' }}
          />
          <input
            type="number"
            className="form-control"
            name="estado"
            placeholder="Estado: 0 inactivo, 1 activo, 2 deshabilitado"
            value={formulario.estado}
            onChange={handleChange}
            style={{ minWidth: '200px' }}
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={guardar}>
            {modoEdicion ? 'Actualizar' : 'Guardar'}
          </button>
          <button className="btn btn-secondary" onClick={toggleMostrar}>
            {mostrarDatos ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>

      {mostrarDatos && (
        <table className="table table-bordered table-striped mt-4">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Password</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.usuario}</td>
                <td>{usuario.password}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.estado}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editar(usuario)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(usuario.usuario)}
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

export default RegistroUsuarios;
