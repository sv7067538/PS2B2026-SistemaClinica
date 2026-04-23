function Navbar() {
  const scrollToServicios = () => {
    const serviciosSection = document.getElementById('servicios-section');
    if (serviciosSection) {
      serviciosSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="navbar">
      <h2>Sistema Clínico - Uroclinic</h2>

      <div className="menu">
        <a href="#">Iniciar Sesión</a>
        <a href="#">Registrarse</a>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          scrollToServicios();
        }}>Servicios</a>
      </div>
    </nav>
  );
}

export default Navbar;