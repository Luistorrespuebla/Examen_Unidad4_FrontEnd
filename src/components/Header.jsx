import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-dark text-white py-3 d-flex align-items-center justify-content-center">
      <img src={logo} alt="Logo muebleria" width="140" height="140" className="me-3" />
    </header>
  );
};

export default Header;