import { useState } from "react";
import axios from "axios";

function HistorialClinico() {
  const [historial, setHistorial] = useState([]);
  const [idPaciente, setIdPaciente] = useState("");

  const buscar = async () => {
    try {
    const res = await axios.get(
  `http://localhost:3000/historial/paciente/${idPaciente}`
);
      setHistorial(res.data);
    } catch (error) {
      alert("Error al cargar historial");
    }
  };

  return (
    <div>
      <h2>Historial Clínico</h2>

      <input
        placeholder="ID Paciente"
        onChange={e => setIdPaciente(e.target.value)}
      />

      <button onClick={buscar}>Buscar</button>

      {historial.map(h => (
        <div key={h.id_historial} style={styles.card}>
          
          <p><strong>Fecha:</strong> {new Date(h.fecha).toLocaleString("es-BO")}</p>
          
          <p><strong>Médico:</strong> {h.medico_nombre} {h.medico_apellido}</p>

          <p><strong>Diagnóstico:</strong> {h.diagnostico}</p>

          <p><strong>Tratamiento:</strong> {h.tratamiento}</p>

          <p><strong>Observaciones:</strong> {h.observaciones}</p>

          <p><strong>Motivo:</strong> {h.motivo_consulta}</p>

        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#FFFFFF",
    margin: "10px 0",
    padding: "15px",
    borderLeft: "5px solid #27AE60",
    borderRadius: "8px"
  }
};

export default HistorialClinico;