import { useEffect, useState } from "react";
import axios from "axios";

function MedicoPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  const id_medico = 1;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/medicos/${id_medico}/pacientes`)
      .then(res => setPacientes(res.data))
      .catch(() => alert("Error al cargar pacientes"));
  }, []);

  const verHistorial = async (id_paciente, nombre) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/historial/paciente/${id_paciente}`
      );

      setHistorial(res.data);
      setPacienteSeleccionado(nombre);
    } catch (err) {
      console.log(err);
      alert("Error al cargar historial");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> Registro de Pacientes</h2>

      {pacientes.length === 0 ? (
        <p>No hay pacientes asignados</p>
      ) : (
        pacientes.map(p => (
          <div key={p.id_paciente} style={styles.card}>
            
            <div style={styles.header}>
              <span style={styles.nombre}>
                {p.nombre} {p.apellido}
              </span>
              <span style={styles.badge}>ID: {p.id_paciente}</span>
            </div>

            <div style={styles.info}>
              <p><strong>CI:</strong> {p.ci}</p>
            </div>

            <button
              style={styles.button}
              onClick={() =>
                verHistorial(p.id_paciente, `${p.nombre} ${p.apellido}`)
              }
            >
              Ver Historial
            </button>

          </div>
        ))
      )}

      {/* HISTORIAL */}
      {pacienteSeleccionado && (
        <div style={styles.historialBox}>
          <h3>🩺 Historial de {pacienteSeleccionado}</h3>

          {historial.length === 0 ? (
            <p>No hay registros</p>
          ) : (
            historial.map(h => (
              <div key={h.id_historial} style={styles.historialCard}>
                <p><strong>Fecha:</strong> {new Date(h.fecha).toLocaleString()}</p>
                <p><strong>Diagnóstico:</strong> {h.diagnostico}</p>
                <p><strong>Tratamiento:</strong> {h.tratamiento}</p>
                <p><strong>Observaciones:</strong> {h.observaciones}</p>
                <p><strong>Médico:</strong> {h.medico_nombre} {h.medico_apellido}</p>
              </div>
            ))
          )}
        </div>
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
    borderRadius: "18px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    borderLeft: "6px solid #2D9CDB",
    transition: "all 0.25s ease"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "1px solid #EAECEF",
    paddingBottom: "10px"
  },

  nombre: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1B4F72"
  },

  badge: {
    background: "linear-gradient(135deg, #27AE60, #219150)",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    boxShadow: "0 3px 8px rgba(39,174,96,0.25)"
  },

  info: {
    marginBottom: "18px",
    color: "#4F5B67",
    lineHeight: "1.6",
    fontSize: "15px"
  },

  button: {
    background: "linear-gradient(135deg, #1B6CA8, #14507C)",
    color: "#fff",
    border: "none",
    padding: "11px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(27,108,168,0.25)",
    transition: "0.25s ease"
  },

  historialBox: {
    marginTop: "35px",
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
  },

  historialCard: {
    background: "#F8FBFE",
    padding: "18px",
    marginTop: "18px",
    borderRadius: "14px",
    borderLeft: "5px solid #27AE60",
    boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
    lineHeight: "1.7",
    color: "#34495E"
  }
};

export default MedicoPacientes;