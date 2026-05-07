import ubicacionIcon from "../assets/ubicacion.png";
import telefonoIcon from "../assets/whatsapp.png";
import webIcon from "../assets/sitio-web.png";
import correoIcon from "../assets/correo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna Izquierda - Título */}
        <div className="footer-left">
          <h3>SISTEMA CLÍNICO</h3>
          <p className="footer-description">Atención médica de calidad</p>
        </div>

        {/* Columna Central - Ubicación y Teléfono */}
        <div className="footer-center">
          <div className="contact-group">
            <h4>
              <img className="icon" src={ubicacionIcon} alt="ubicación" />
              <strong>Ubicación:</strong>
            </h4>
            <p>Emergencia: Av. La Paz</p>
            <p>Ingreso: Calle El Alto</p>
          </div>

          <div className="contact-group">
            <h4>
              <img className="icon" src={telefonoIcon} alt="teléfono" />
              <strong>Teléfono:</strong>
            </h4>
            <p>(+591 78213556)</p>
          </div>
        </div>

        {/* Columna Derecha - Web y Correo */}
        <div className="footer-right">
          <div className="contact-group">
            <h4>
              <strong>Página Web:</strong>
              <img className="icon" src={webIcon} alt="web" />
            </h4>
            <p>www.UroclinicPage.com</p>
          </div>

          <div className="contact-group">
            <h4>
              <strong>Correo:</strong>
              <img className="icon" src={correoIcon} alt="correo" />
            </h4>
            <p>adminclinica@gmail.com</p>
          </div>
        </div>

        {/*Copyright dentro del container */}
        <div className="footer-copyright">
          <p>© 2026 Clínica Uroclinic</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;