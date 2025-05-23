import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Contexto from '../context/Contexto.jsx';

export default function Muebles() {
  const { usuario } = useContext(Contexto);
  const token = typeof usuario === "string" ? usuario : usuario.token;

  const [nombreMueble, setNombreMueble] = useState("");
  const [estilo, setEstilo] = useState("");
  const [precio, setPrecio] = useState("");
  const [inventario, setInventario] = useState("");
  const [id, setId] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [datos, setDatos] = useState([]);
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const headers = {
    headers: {
      Autorizacion: "Back " + token
    }
  };

  const limpiarCampos = () => {
    setNombreMueble("");
    setEstilo("");
    setPrecio("");
    setInventario("");
    setId("");
    setArchivo(null);
    setPreview(null);
    setModoEdicion(false);
  };

  const mostrar = async () => {
    if (mostrarDatos) {
      setMostrarDatos(false);
      return;
    }

    try {
      const respuesta = await axios.get("http://localhost:3001/Muebles", headers);
      setDatos(respuesta.data);
      setMostrarDatos(true);
    } catch (error) {
      Swal.fire("Error", "No se pudo cargar la lista de muebles", "error");
    }
  };

  const subirImagen = async () => {
    if (!archivo) return null;

    const formData = new FormData();
    formData.append("image", archivo);

    try {
      const res = await fetch("http://localhost:3001/imagen", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (data.estatus === "correcto") {
        return data.url;
      } else {
        Swal.fire("Error", "No se pudo subir la imagen", "error");
        return null;
      }
    } catch (error) {
      Swal.fire("Error", "Error de red al subir imagen", "error");
      return null;
    }
  };

  const insertar = async () => {
    if (!nombreMueble || !estilo || !precio || !inventario) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    const nombreExistente = datos.find((mueble) => mueble.nombreMueble === nombreMueble);
    if (nombreExistente) {
      Swal.fire("Nombre duplicado", "Ya existe un mueble con ese nombre", "error");
      return;
    }

    const urlImagen = await subirImagen();
    if (!urlImagen) return;

    try {
      await axios.post("http://localhost:3001/insercion_Muebles", {
        nombreMueble,
        estilo,
        precio,
        inventario,
        id: urlImagen
      }, headers);

      Swal.fire("Insertado", "Mueble agregado correctamente", "success");
      mostrar();
      limpiarCampos();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.error || "No se pudo insertar el mueble", "error");
    }
  };

  const actualizar = async () => {
    if (!nombreMueble || !estilo || !precio || !inventario) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    const nombreDuplicado = datos.find((m) => m.nombreMueble === nombreMueble && m.id !== id);
    if (nombreDuplicado) {
      Swal.fire("Nombre duplicado", "Ya existe otro mueble con ese nombre", "error");
      return;
    }

    let urlImagen = id;
    if (archivo) {
      const nuevaUrl = await subirImagen();
      if (!nuevaUrl) return;
      urlImagen = nuevaUrl;
    }

    try {
      await axios.put(`http://localhost:3001/actualizar_Muebles/${nombreMueble}`, {
        estilo,
        precio,
        inventario,
        id: urlImagen
      }, headers);

      Swal.fire("Actualizado", "Mueble actualizado correctamente", "success");
      mostrar();
      limpiarCampos();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.error || "No se pudo actualizar el mueble", "error");
    }
  };

  const eliminar = async (nombre) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás el mueble "${nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/eliminar_Muebles/${nombre}`, headers);
          Swal.fire("Eliminado", "Mueble eliminado correctamente", "success");
          mostrar();
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el mueble", "error");
        }
      }
    });
  };

  const cargarParaActualizar = (mueble) => {
    setNombreMueble(mueble.nombreMueble);
    setEstilo(mueble.estilo);
    setPrecio(mueble.precio);
    setInventario(mueble.inventario);
    setId(mueble.id);
    setPreview(`http://localhost:3001/uploads/${mueble.id}`);
    setArchivo(null);
    setModoEdicion(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Gestión de Muebles</h2>

      <div className="row mb-3">
        <div className="col">
          <input className="form-control" placeholder="Nombre del Mueble" value={nombreMueble} onChange={(e) => setNombreMueble(e.target.value)} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="Estilo" value={estilo} onChange={(e) => setEstilo(e.target.value)} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="Precio" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="Inventario" type="number" value={inventario} onChange={(e) => setInventario(e.target.value)} />
        </div>
        <div className="col">
          <input className="form-control" type="file" accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setArchivo(file);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result);
                reader.readAsDataURL(file);
              } else {
                setPreview(null);
              }
            }}
          />
          {preview && (
            <div className="mt-2 text-center">
              <img src={preview} alt="Vista previa"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                  borderRadius: "8px"
                }}
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}
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
              <th>Estilo</th>
              <th>Precio</th>
              <th>Inventario</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((mueble, i) => (
              <tr key={i}>
                <td>{mueble.nombreMueble}</td>
                <td>{mueble.estilo}</td>
                <td>{mueble.precio}</td>
                <td>{mueble.inventario}</td>
                <td>
                  <a href={mueble.id} target="_blank" rel="noopener noreferrer">
                    <img
                      src={mueble.id}
                      alt="Imagen del mueble"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                      onError={(e) => {
                        console.error("Error al cargar imagen:", mueble.id);
                        e.target.src = "";
                      }}
                    />
                  </a>
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => cargarParaActualizar(mueble)}>Actualizar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminar(mueble.nombreMueble)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
