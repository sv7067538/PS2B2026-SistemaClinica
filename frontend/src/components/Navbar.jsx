import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleServiciosClick = (e) => {
    e.preventDefault();
    
    // Si estamos en el landing page, hacer scroll
    if (location.pathname === '/') {
      const serviciosSection = document.getElementById('servicios-section');
      if (serviciosSection) {
        serviciosSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Si estamos en otra página, ir al landing page
      navigate('/');
      // Esperar a que cargue y luego hacer scroll
      setTimeout(() => {
        const serviciosSection = document.getElementById('servicios-section');
        if (serviciosSection) {
          serviciosSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Determinar el texto del botón según la página actual
  const getServiciosButtonText = () => {
    if (location.pathname === '/') {
      return 'Servicios';
    } else {
      return 'Volver al Inicio';
    }
  };

  return (
    <nav className="navbar">
      <h2>Sistema Clínico - Uroclinic</h2>

      <div className="menu">
        {!isLoggedIn ? (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/signup">Registrarse</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        )}
        
        <a href="#" onClick={handleServiciosClick}>
          {getServiciosButtonText()}
        </a>
      </div>
    </nav>
  );
}

export default Navbar;