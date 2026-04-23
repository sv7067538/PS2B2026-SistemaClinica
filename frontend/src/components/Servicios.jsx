import { useState } from 'react';


function Servicios() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const informacionServicios = {
    "Pediatría": {
      descripcion: "Atención médica especializada para niños y adolescentes desde el nacimiento hasta los 18 años.",
      horario: "Lunes a Viernes: 8:00 - 18:00",
      telefono: "(591) 2-1234567"
    },
    "Vacunatorio": {
      descripcion: "Centro de vacunación con todas las vacunas del calendario nacional e internacional.",
      horario: "Lunes a Viernes: 9:00 - 17:00",
      telefono: "(591) 2-1234568"
    },
    "Cardiología": {
      descripcion: "Diagnóstico y tratamiento de enfermedades del corazón y sistema circulatorio.",
      horario: "Lunes a Viernes: 8:00 - 16:00",
      telefono: "(591) 2-1234569"
    },
    "Dermatología": {
      descripcion: "Tratamiento de enfermedades de la piel, cabello y uñas.",
      horario: "Lunes a Viernes: 9:00 - 18:00",
      telefono: "(591) 2-1234570"
    },
    "Odontología": {
      descripcion: "Servicios dentales: limpieza, ortodoncia, implantes y cirugía oral.",
      horario: "Lunes a Viernes: 8:00 - 19:00",
      telefono: "(591) 2-1234571"
    },
    "Emergencia": {
      descripcion: "Atención de urgencias médicas 24 horas los 365 días del año.",
      horario: "24/7 - Todos los días",
      telefono: "(591) 78213556"
    },
    "Hospitalización": {
      descripcion: "Habitaciones privadas con atención médica y enfermería las 24 horas.",
      horario: "Servicio continuo",
      telefono: "(591) 2-1234572"
    },
    "Consultorios": {
      descripcion: "Consultorios médicos equipados para atención de diversas especialidades.",
      horario: "Lunes a Viernes: 7:00 - 20:00",
      telefono: "(591) 2-1234573"
    },
    "Medicina General": {
      descripcion: "Atención médica primaria y chequeos preventivos.",
      horario: "Lunes a Viernes: 8:00 - 18:00",
      telefono: "(591) 2-1234574"
    }
  };

  const abrirModal = (servicio) => {
    setServicioSeleccionado(servicio);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setServicioSeleccionado(null);
  };

  const lista = [
    "Pediatría",
    "Vacunatorio",
    "Cardiología",
    "Dermatología",
    "Odontología",
    "Emergencia",
    "Hospitalización",
    "Consultorios",
    "Medicina General"
  ];

  return (
    <>
      <section id="servicios-section" className="servicios">
        <h2>Servicios disponibles de la clínica</h2>

        <div className="grid">
          {lista.map((item, index) => (
            <div className="card" key={index} onClick={() => abrirModal(item)}>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Modal - Ventana emergente */}
      {modalAbierto && servicioSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{servicioSeleccionado}</h3>
              <button className="modal-close" onClick={cerrarModal}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Descripción:</strong> {informacionServicios[servicioSeleccionado]?.descripcion}</p>
              <p><strong>Horario:</strong> {informacionServicios[servicioSeleccionado]?.horario}</p>
              <p><strong>Teléfono:</strong> {informacionServicios[servicioSeleccionado]?.telefono}</p>
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

export default Servicios;