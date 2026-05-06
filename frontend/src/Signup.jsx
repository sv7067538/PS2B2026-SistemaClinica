/*import { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />

      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Signup;*/


import { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "" // 👈 AGREGADO
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // 🔴 VALIDACIÓN
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/signup", {
        nombre: form.nombre,
        email: form.email,
        password: form.password
      });

      alert("Registro exitoso");
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <h1>SISTEMA CLINICO</h1>
        <div className="nav">
          <a href="#">INICIO</a>
          <a href="#">SOBRE NOSOTROS</a>
        </div>
      </div>

      {/* FORM */}
      <div className="container">
        <h2>Registrarse</h2>
        <p>registre sus datos de usuario</p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="full"
            name="nombre"
            placeholder="Nombre Completo"
            onChange={handleChange}
          />

          <input
            className="full"
            name="email"
            placeholder="Correo"
            onChange={handleChange}
          />

          <input
            className="full"
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />

          <input
            className="full"
            type="password"
            name="confirmPassword" // 👈 IMPORTANTE
            placeholder="Verifique su contraseña"
            onChange={handleChange}
          />

          <div className="full">
            <button className="btn">Registrarse</button>
          </div>
        </form>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div>SISTEMA CLINICO</div>
        <div>Ubicaciones: La Paz</div>
      </div>
    </>
  );
}

export default Signup;