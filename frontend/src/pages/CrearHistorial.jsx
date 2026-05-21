import { useState } from "react";
import axios from "axios";

function CrearHistorial() {
  const [form, setForm] = useState({
    id_paciente: "",
    id_medico: 1,
    diagnostico: "",
    tratamiento: "",
    observaciones: "",
    motivo_consulta: ""
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async () => {
    try {
     await axios.post("http://localhost:5000/api/historial", form);
      alert("Historial guardado correctamente");
    } catch {
      alert("Error al guardar");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear Historial Clínico</h2>

        <input
          style={styles.input}
          name="id_paciente"
          placeholder="ID Paciente"
          onChange={handleChange}
        />

        <textarea
          style={styles.textarea}
          name="motivo_consulta"
          placeholder="Motivo de consulta"
          onChange={handleChange}
        />

        <textarea
          style={styles.textarea}
          name="diagnostico"
          placeholder="Diagnóstico"
          onChange={handleChange}
        />

        <textarea
          style={styles.textarea}
          name="tratamiento"
          placeholder="Tratamiento"
          onChange={handleChange}
        />

        <textarea
          style={styles.textarea}
          name="observaciones"
          placeholder="Observaciones"
          onChange={handleChange}
        />

        <button onClick={guardar} style={styles.button}>
          Guardar Historial
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#EEF3F8",
    padding: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif"
  },

  card: {
    background: "#FFFFFF",
    padding: "35px",
    borderRadius: "22px",
    width: "100%",
    maxWidth: "850px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    borderTop: "6px solid #1B6CA8"
  },

  title: {
    color: "#1B4F72",
    marginBottom: "10px",
    fontSize: "30px",
    fontWeight: "700",
    borderBottom: "1px solid #E5EAF0",
    paddingBottom: "15px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #D6DDE8",
    fontSize: "15px",
    outline: "none",
    background: "#FAFCFE",
    transition: "0.25s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
  },

  textarea: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #D6DDE8",
    fontSize: "15px",
    minHeight: "110px",
    resize: "vertical",
    outline: "none",
    background: "#FAFCFE",
    transition: "0.25s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    fontFamily: "'Segoe UI', sans-serif",
    lineHeight: "1.7"
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    background: "linear-gradient(135deg, #27AE60, #1E874B)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s ease",
    boxShadow: "0 5px 14px rgba(39,174,96,0.25)"
  }
};

export default CrearHistorial;