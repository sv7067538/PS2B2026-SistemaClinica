import { useEffect, useState } from "react";
import axios from "axios";

function MedicoCitas() {
  const [citas, setCitas] = useState([]);
  const [idMedico, setIdMedico] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar citas del médico
  const cargarCitas = async (medicoId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:5000/api/citas/medico/${medicoId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Citas recibidas:', res.data);
      setCitas(res.data.data || []);
    } catch (error) {
      console.error("Error al cargar citas:", error);
    }
  };

  useEffect(() => {
    const obtenerMedico = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        console.log('Usuario:', user);
        console.log('Token:', token);
        
        if (!user || !token) {
          console.error('No hay usuario o token');
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/medicos/usuario/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        console.log('Respuesta médico:', res.data);
        
        if (res.data.completado && res.data.medico) {
          const id = res.data.medico.id_medico;
          setIdMedico(id);
          await cargarCitas(id);
        } else {
          console.error('Médico no tiene perfil completo');
        }
      } catch (error) {
        console.error('Error obteniendo médico:', error);
      } finally {
        setLoading(false);
      }
    };
    
    obtenerMedico(); 
  }, []);

  // Confirmar cita
  const confirmar = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/citas/${id}/confirmar`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (idMedico) cargarCitas(idMedico);
      alert("Cita confirmada");
    } catch (error) {
      console.error("Error al confirmar:", error);
      alert("Error al confirmar");
    }
  };

  // Completar cita
  const completar = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/citas/${id}/completar`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (idMedico) cargarCitas(idMedico);
      alert("Cita completada");
    } catch (error) {
      console.error("Error al completar:", error);
      alert("Error al completar");
    }
  };

  if (loading) return <div style={styles.container}>Cargando...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Citas del Médico</h2>

      {citas.length === 0 ? (
        <p>No hay citas asignadas</p>
      ) : (
        citas.map((cita) => (
          <div key={cita.id_cita} style={styles.card}>
            <p><strong>Paciente:</strong> {cita.paciente_nombre} {cita.paciente_apellido}</p>
            <p><strong>Fecha:</strong> {cita.fecha}</p>
            <p><strong>Hora:</strong> {cita.hora}</p>
            <p><strong>Estado:</strong> {cita.estado}</p>
            <p><strong>Motivo:</strong> {cita.motivo}</p>

            <div style={styles.buttons}>
              <button onClick={() => confirmar(cita.id_cita)} style={styles.confirmar}>
                Confirmar
              </button>

              <button onClick={() => completar(cita.id_cita)} style={styles.completar}>
                Completar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "25px",
    background: "#EEF3F8",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif"
  },

  title: {
    color: "#1B4F72",
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "25px"
  },

  card: {
    background: "#FFFFFF",
    padding: "22px",
    margin: "18px 0",
    borderLeft: "6px solid #2D9CDB",
    borderRadius: "18px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transition: "0.25s ease",
    lineHeight: "1.9"
  },

  buttons: {
    marginTop: "18px",
    paddingTop: "15px",
    borderTop: "1px solid #E2E8F0",
    display: "flex",
    gap: "12px"
  },

  confirmar: {
    background: "linear-gradient(135deg, #1B6CA8, #14507C)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(27,108,168,0.25)",
    transition: "0.25s ease"
  },

  completar: {
    background: "linear-gradient(135deg, #27AE60, #1E874B)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(39,174,96,0.25)",
    transition: "0.25s ease"
  }
};

export default MedicoCitas;