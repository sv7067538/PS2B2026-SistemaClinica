import { useState } from 'react';

function Hero() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contenidoModal, setContenidoModal] = useState({
    titulo: '',
    texto: ''
  });

  const informacionLinks = {
    especialistas: {
      titulo: "Especialistas",
      texto: "Nuestra clínica cuenta con un equipo de médicos especialistas en diversas áreas como cardiología, pediatría, dermatología, odontología y más. Todos nuestros profesionales están altamente capacitados y cuentan con amplia experiencia en el sector."
    },
    tecnologia: {
      titulo: "Tecnología",
      texto: "Implementamos tecnología de punta para brindar diagnósticos precisos y tratamientos efectivos. Contamos con equipos de última generación, sistema de gestión digital y telemedicina para tu comodidad."
    },
    comoLlegar: {
      titulo: "¿Cómo llegar?",
      texto: "Nos encontramos en Av. La Paz #1234. Puedes llegar en transporte público (líneas 1,2,3), en vehículo particular (contamos con estacionamiento) o mediante servicios de taxi/uber. ¡Te esperamos!"
    }
  };

  const abrirModal = (tipo) => {
    setContenidoModal(informacionLinks[tipo]);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <>
      <section className="hero">
        <div className="overlay">
          <div className="hero-text">
            <h1>¡PRIMERO ESTÁS TÚ!</h1>
            <p>TU BIENESTAR ES NUESTRA PRIORIDAD</p>
          </div>

          <div className="acerca">
            <h2>¡ACERCA DE NOSOTROS!</h2>
            <p>
              Somos una clínica enfocada en brindar atención de calidad 
              a todos nuestros pacientes.
            </p>
            <p>
              El sistema web de Uroclinic simplifica tu agenda,
              ayuda a manejar correctamente los historiales de pacientes 
              y mejora la coordinación del personal médico.
            </p>
          </div>
          
          <div className="links">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              abrirModal('especialistas');
            }}>Especialistas</a>
            
            <a href="#" onClick={(e) => {
              e.preventDefault();
              abrirModal('tecnologia');
            }}>Tecnología</a>
            
            <a href="#" onClick={(e) => {
              e.preventDefault();
              abrirModal('comoLlegar');
            }}>¿Cómo llegar?</a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{contenidoModal.titulo}</h3>
              <button className="modal-close" onClick={cerrarModal}>×</button>
            </div>
            <div className="modal-body">
              <p>{contenidoModal.texto}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={cerrarModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;