import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function MisCitas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/citas/paciente/1")
      .then(res => setCitas(res.data));
  }, []);

  const cancelar = async (id) => {
    try {
     await axios.put(`http://localhost:3000/citas/${id}/cancelar`);
      alert("Cita cancelada");

      const res = await axios.get("http://localhost:3000/citas/paciente/1");
      setCitas(res.data);
    } catch {
      alert("Error al cancelar");
    }
  };

  return (
    <div className="card">
      <h2>Mis Citas</h2>

      {citas.map(c => (
        <div className="list-item" key={c.id_cita}>
          <p><b>Fecha:</b> {c.fecha}</p>
          <p><b>Hora:</b> {c.hora}</p>
          <p><b>Estado:</b> {c.estado}</p>

          <button className="cancel" onClick={() => cancelar(c.id_cita)}>
            Cancelar
          </button>
        </div>
      ))}
    </div>
  );
}

export default MisCitas;