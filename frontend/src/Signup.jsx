import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "paciente", 
    codigo_verificacion: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError("");
    if (e.target.name === "rol") {
        setMostrarCodigo(e.target.value === "medico");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    // Validación
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (form.rol === "medico" && form.codigo_verificacion !== "MED2026") {
        setError("Código de verificación inválido");
        return;
    }
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        rol: form.rol
      });

      alert(res.data.message || "Registro exitoso");
      // Redirigir al login después de registrarse
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || "Error al registrarse";
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <p>registre sus datos de usuario</p>

      {error && <div className="error-message" style={{color: 'red', textAlign: 'center', marginBottom: '15px'}}>{error}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="full"
          name="nombre"
          placeholder="Nombre Completo"
          onChange={handleChange}
          required
        />

        <input
          className="full"
          name="email"
          type="email"
          placeholder="Correo"
          onChange={handleChange}
          required
        />

        <input
          className="full"
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />

        <input
          className="full"
          type="password"
          name="confirmPassword"
          placeholder="Verifique su contraseña"
          onChange={handleChange}
          required
        />
        <select className="full" name="rol" value={form.rol} onChange={handleChange} required>
            <option value="paciente">Paciente</option>
            <option value="medico">Personal Médico</option>
        </select>

        {mostrarCodigo && (
            <input className="full" name="codigo_verificacion" type="password" placeholder="Código de verificación" onChange={handleChange} required />
        )}
        <div className="full">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;