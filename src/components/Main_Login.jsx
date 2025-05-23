import { useContext } from 'react';
import Contexto from '../context/Contexto';
import { useNavigate } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';  
import Swal from 'sweetalert2';

const Main_Login = () => {
  const { login } = useContext(Contexto);
  const navegacion = useNavigate();
  
  const validaciones = {
    usuario: {
      required: "El campo usuario es requerido",
      pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: "El usuario solo puede contener letras y números"
      }
    },
    password: {
      required: "El campo password es requerido",
      pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: "La contraseña solo puede contener letras y números"
      }
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onsubmit = (data) => {
    console.log("📤 Enviando datos de login:", data);

    fetch("http://localhost:3001/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        usuario: data.usuario,
        password: data.password
      })
    })
    .then(res => {
      console.log("🔄 Respuesta bruta del servidor:", res);
      return res.json();
    })
    .then(respuesta => {
      console.log("✅ Respuesta procesada del servidor:", respuesta);

      if (respuesta.token && respuesta.usuario) {
        const { estado } = respuesta.usuario;

        if (estado === 2 || estado === "2") {
          console.warn("🔒 Usuario con estado 2 (bloqueado)");
          Swal.fire({
            icon: 'warning',
            title: 'Acceso restringido',
            text: 'Tu cuenta está bloqueada. Por favor, comunícate con el administrador.'
          });
          return;
        }

        const datosUsuario = {
          token: respuesta.token,
          ...respuesta.usuario  
        };

        console.log("🧾 Datos del usuario logueado:", datosUsuario);

        login(datosUsuario);
        navegacion("/", { replace: true });
      } else {
        console.warn("❌ Credenciales incorrectas o datos faltantes:", respuesta);
        Swal.fire({
          icon: 'error',
          title: 'Credenciales no válidas',
          text: 'Verifica tu usuario y contraseña'
        });
      }
    })
    .catch(error => {
      console.error("💥 Error en el servidor al autenticar:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error del servidor',
        text: 'Ocurrió un error al intentar iniciar sesión'
      });
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh', backgroundColor: '#f8f9fa' }}>
      <div className="p-5 bg-white shadow rounded" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-dark">Ingresa tus datos</h2>
        <Form onSubmit={handleSubmit(onsubmit)}>
          <Form.Group className="mb-4">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              {...register("usuario", validaciones.usuario)}
              type="text"
              placeholder="Nombre de usuario"
              className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
            />
            {errors.usuario && <div className="invalid-feedback d-block">{errors.usuario.message}</div>}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              {...register("password", validaciones.password)}
              type="password"
              placeholder="Ingrese su contraseña"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button type="submit" className="w-100 btn btn-danger">
              Ingresar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Main_Login;
