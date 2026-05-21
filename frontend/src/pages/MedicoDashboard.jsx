import { useState } from "react";
import MedicoCitas from "./MedicoCitas";
import MedicoPacientes from "./MedicoPacientes";
import HistorialClinico from "./HistorialClinico";
import FormularioHistorial from "./CrearHistorial";
import './MedicoDashboard.css';
import CrearHistorial from "./CrearHistorial";
function MedicoDashboard() {
  const [vista, setVista] = useState("citas");

  return (
    <div style={styles.container}>
      
      {/* SIDEBAR */}
      <div className="medico-container">
      <div className="medico-sidebar">
      <div style={styles.sidebar}>
        <h2 style={styles.title}>🏥 Médico</h2>

        <button style={styles.btn} onClick={() => setVista("citas")}>
          📅 Citas
        </button>

        <button style={styles.btn} onClick={() => setVista("pacientes")}>
          👥 Pacientes
        </button>

        <button style={styles.btn} onClick={() => setVista("historial")}>
          📄 Historial
        </button>
        <button style={styles.btn} onClick={() => setVista("crearhistorial")}>
          📄 Crear Historial
        </button>
      </div>
</div>
    </div>
      {/* CONTENIDO */}
      <div style={styles.content}>
        {vista === "citas" && <MedicoCitas />}
        {vista === "pacientes" && <MedicoPacientes />}
        {vista === "historial" && <HistorialClinico />}
        {vista === "crearhistorial" && <CrearHistorial />}
      </div>

    </div>
    
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif"
  },

  sidebar: {
    width: "220px",
    background: "linear-gradient(180deg, #1B6CA8, #144A75)",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  title: {
    marginBottom: "20px"
  },

  btn: {
    background: "rgba(255,255,255,0.1)",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "left"
  },

  content: {
    flex: 1,
    background: "#F4F6F9",
    padding: "20px",
    overflowY: "auto"
  }
};

export default MedicoDashboard;