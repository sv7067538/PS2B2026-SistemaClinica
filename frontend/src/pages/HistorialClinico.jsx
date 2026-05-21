import { useState } from "react";
import axios from "axios";

function HistorialClinico() {
  const [historial, setHistorial] = useState([]);
  const [idPaciente, setIdPaciente] = useState("");

  const buscar = async () => {
    if(!idPaciente)
      return;
    try {
    const res = await axios.get(
  `http://localhost:5000/api/historial/paciente/${idPaciente}`
);
      setHistorial(res.data);
    } catch (error) {
      alert("Error al cargar historial", error);
    }
  };

  return (
    <div>
      <h2 style={styles.title}>Historial Clínico</h2>

      <input
      style={styles.input}
        placeholder="ID Paciente"
        onChange={e => setIdPaciente(e.target.value)}
      />

      <button style={styles.button} onClick={buscar}>Buscar</button>
{historial.length === 0 && idPaciente && (
              <p style={styles.empty}>
                  No existe el historial para este paciente.
              </p>
)}
      {historial.map(h => (
        <div key={h.id_historial} style={styles.card}>
          
          <p style={styles.text}><strong>Fecha:</strong> {new Date(h.fecha).toLocaleString("es-BO")}</p>
          
          <p style={styles.text}><strong>Médico:</strong> {h.medico_nombre} {h.medico_apellido}</p>

          <p style={styles.text}><strong>Diagnóstico:</strong> {h.diagnostico}</p>

          <p style={styles.text}><strong>Tratamiento:</strong> {h.tratamiento}</p>

          <p style={styles.text}><strong>Observaciones:</strong> {h.observaciones}</p>

          <p style={styles.text}><strong>Motivo:</strong> {h.motivo_consulta}</p>
          
        </div>
        
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#FFFFFF",
    margin: "20px 0",
    padding: "22px",
    borderLeft: "6px solid #27AE60",
    borderRadius: "16px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
    transition: "0.25s ease",
    fontFamily: "Segoe UI, sans-serif"
  },

  title: {
    color: "#1B4F72",
    marginBottom: "25px",
    fontSize: "30px",
    fontWeight: "700"
  },

  input: {
    width: "260px",
    padding: "12px 15px",
    border: "1px solid #D6DDE8",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
    background: "#FFF",
    marginRight: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
  },

  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #1B6CA8, #14507C)",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(27,108,168,0.25)"
  },

  text: {
    margin: "10px 0",
    color: "#34495E",
    lineHeight: "1.5",
    fontSize: "15px"
  },

  empty: {
    marginTop: "20px",
    background: "#FFF",
    padding: "18px",
    borderRadius: "12px",
    border: "1px dashed #CFD8E3",
    color: "#7B8A9A",
    textAlign: "center"
  }
};

export default HistorialClinico;