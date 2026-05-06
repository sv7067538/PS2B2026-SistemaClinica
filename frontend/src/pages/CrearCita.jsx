import { useState } from "react";
import axios from "axios";
import "./styles.css";

function CrearCita() {
  const [form, setForm] = useState({
    id_paciente: 1,
    id_medico: 1,
    fecha: "",
    hora: "",
    motivo: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/citas", form);
      alert("Cita creada correctamente");
    } catch {
      alert("Error al crear cita");
    }
  };

  return (
    <div className="card">
      <h2>Crear Cita</h2>

      <form onSubmit={handleSubmit}>
        <input type="date" name="fecha" onChange={handleChange} />
        <input type="time" name="hora" onChange={handleChange} />
        <input name="motivo" placeholder="Motivo de la cita" onChange={handleChange} />

        <button type="submit">Guardar Cita</button>
      </form>
    </div>
  );
}

export default CrearCita;