import { useContext } from 'react';
import Contexto from '../context/Contexto';
import { useNavigate } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';  
import Swal from 'sweetalert2';

const MainLogin = () => {
  const { login } = useContext(Contexto);
  const navegacion = useNavigate();
  
  const validaciones = {
    usuario: {
      required: "El campo usuario es requerido",
      petter: {
        value: /[a-zA-Z0-9]+/,
        message: "La contraseña solo puede contener letras y números"
      }
    },
    password: {
      required: "El campo password es requerido",
      petter: {
        value: /[a-zA-Z0-9]+/,
        message: "La contraseña solo puede contener letras y números"
      }
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onsubmit = (data) => {
    fetch("http://localhost:3001/login", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({
        usuario: data.usuario,
        password: data.password
      })
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
      if (respuesta.token) {
        login(respuesta);
        navegacion("/", { replace: true });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales no válidas',
          text: 'Verifica tu usuario y contraseña'
        });
      }
    })
    .catch(error => {
      console.log("Se ha generado un error en el servidor ", error);
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

export default MainLogin;
