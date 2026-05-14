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
     await axios.post("http://localhost:3000/historial", form);
      alert("Historial guardado correctamente");
    } catch {
      alert("Error al guardar");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🩺 Crear Historial Clínico</h2>

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
    background: "linear-gradient(135deg, #1B6CA8, #2980B9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  title: {
    textAlign: "center",
    color: "#1B6CA8",
    marginBottom: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minHeight: "60px",
    resize: "none"
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#27AE60",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s"
  }
};

export default CrearHistorial;