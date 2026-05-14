import { useState } from "react";
import axios from "axios";
import "./styles.css";

function Paciente() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    ci: "",
    telefono: "",
    direccion: "",
    email: "",
    genero: "M",
    fecha_nacimiento: "",
    tipo_sangre: "",
    alergias: "",
    id_usuario: 4
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/pacientes", form);
      alert("Paciente guardado correctamente");
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="card">
      <h2>Completar Perfil</h2>

      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input name="ci" placeholder="CI" onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
        <input name="direccion" placeholder="Dirección" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Paciente;