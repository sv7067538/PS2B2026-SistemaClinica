import { useEffect, useState } from "react";
import axios from "axios";

function MedicoCitas() {
  const [citas, setCitas] = useState([]);
  const id_medico = 1; // 🔥 luego será dinámico

  // Cargar citas del médico
  const cargarCitas = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/citas/medico/${id_medico}`
      );
      setCitas(res.data);
    } catch (error) {
      alert("Error al cargar citas");
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  // Confirmar cita
  const confirmar = async (id) => {
    try {
      await axios.put(`http://localhost:3000/citas/${id}/confirmar`);
      cargarCitas();
    } catch {
      alert("Error al confirmar");
    }
  };

  // Completar cita
  const completar = async (id) => {
    try {
     await axios.put(`http://localhost:3000/citas/${id}/completar`);
      cargarCitas();
    } catch {
      alert("Error al completar");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Citas del Médico</h2>

      {citas.length === 0 ? (
        <p>No hay citas</p>
      ) : (
        citas.map((cita) => (
          <div key={cita.id_cita} style={styles.card}>
            <p><strong>Paciente:</strong> {cita.paciente_nombre} {cita.apellido}</p>
            <p><strong>Fecha:</strong> {cita.fecha}</p>
            <p><strong>Hora:</strong> {cita.hora}</p>
            <p><strong>Estado:</strong> {cita.estado}</p>

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
    borderLeft: "5px solid #2D9CDB",
    borderRadius: "8px"
  },
  buttons: {
    marginTop: "10px"
  },
  confirmar: {
    marginRight: "10px",
    background: "#2D9CDB",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px"
  },
  completar: {
    background: "#27AE60",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px"
  }
};

export default MedicoCitas;