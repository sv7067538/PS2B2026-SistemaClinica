import { useEffect, useState } from "react";
import axios from "axios";

function MedicoPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  const id_medico = 1;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/medico/${id_medico}/pacientes`)
      .then(res => setPacientes(res.data))
      .catch(() => alert("Error al cargar pacientes"));
  }, []);

  const verHistorial = async (id_paciente, nombre) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/historial/paciente/${id_paciente}`
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
      <h2 style={styles.title}>👥 Pacientes</h2>

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

      {/* 🔥 HISTORIAL */}
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
    padding: "20px",
    background: "#F2F2F2",
    minHeight: "100vh"
  },

  title: {
    color: "#1B6CA8"
  },

  card: {
    background: "#FFFFFF",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    borderLeft: "5px solid #2D9CDB"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },

  nombre: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#1B6CA8"
  },

  badge: {
    background: "#27AE60",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "5px",
    fontSize: "12px"
  },

  info: {
    marginBottom: "10px"
  },

  button: {
    background: "#2D9CDB",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default MedicoPacientes;