import types from './types';

const MiReducer = (state = { logueado: false, usuario: null }, action) => {
  console.log('🚀 [MiReducer] state: ', state); // Verifica el estado

  switch (action.type) {
    case types.login:
      return {
        logueado: true,
        usuario: action.usuario
      };
    case types.logout:
      return {
        logueado: false,
        usuario: null
      };
    default:
      return state;
  }
};

export default MiReducer;
