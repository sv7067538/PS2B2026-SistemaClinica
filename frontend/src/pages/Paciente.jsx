import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import "./styles.css";
import { isValidPhoneNumber } from 'react-phone-number-input';

function Paciente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    ci: "",
    telefono: "",
    direccion: "",
    email: "",
    genero: "",
    fecha_nacimiento: "",
    tipo_sangre: "",
    alergias: "",
    id_usuario: null,
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Opciones para combobox
  const generos = ["M", "F", "O"];
  const tiposSangre = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "No sabe"];

  // Opciones para las fechas
const hoy = new Date().toISOString().split('T')[0];
const hace100Anos = new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split('T')[0];

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setForm(prev => ({ 
        ...prev, 
        id_usuario: userData.id,
        email: userData.email,
        nombre: userData.nombre?.split(' ')[0] || "",
        apellido: userData.nombre?.split(' ').slice(1).join(' ') || ""
      }));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setGeneralError("");
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, telefono: value });
    if (errors.telefono) {
      setErrors({ ...errors, telefono: "" });
    }
  };



  const validarFechaNacimiento = (fecha) => {
    if (!fecha) return false;
    const hoy = new Date();
    const fechaNac = new Date(fecha);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesDiff = hoy.getMonth() - fechaNac.getMonth();
    if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad >= 0 && edad <= 120;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!form.ci) newErrors.ci = "El carnet de identidad es requerido";
    
    // Validar teléfono con el formato del país seleccionado
    if (form.telefono && !isValidPhoneNumber(form.telefono)) {
  newErrors.telefono = "Número de teléfono inválido para el país seleccionado";
}
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (form.email !== user.email) {
      newErrors.email = "El correo no puede ser cambiado";
    }
    
    if (!form.genero) newErrors.genero = "Debes seleccionar un género";
    
    if (!form.fecha_nacimiento) {
      newErrors.fecha_nacimiento = "La fecha de nacimiento es requerida";
    } else if (!validarFechaNacimiento(form.fecha_nacimiento)) {
      newErrors.fecha_nacimiento = "Fecha inválida (edad entre 0 y 120 años)";
    }
    
    if (!form.tipo_sangre) newErrors.tipo_sangre = "Debes seleccionar un tipo de sangre";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:5000/api/pacientes", form, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data.success) {
        alert("Perfil completado correctamente");
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al guardar el perfil";
      setGeneralError(errorMsg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Completar Perfil</h2>
        <p className="subtitle">Ingresa tus datos para completar tu registro</p>

        {generalError && <div className="error-text general-error">{generalError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              name="nombre" 
              placeholder="Nombres" 
              value={form.nombre} 
              onChange={handleChange} 
              className={errors.nombre ? 'error' : ''}
              required 
            />
            {errors.nombre && <div className="error-text">{errors.nombre}</div>}
          </div>

          <div className="input-group">
            <input 
              name="apellido" 
              placeholder="Apellidos" 
              value={form.apellido} 
              onChange={handleChange} 
              className={errors.apellido ? 'error' : ''}
              required 
            />
            {errors.apellido && <div className="error-text">{errors.apellido}</div>}
          </div>

          <div className="input-group">
            <input 
              name="ci" 
              placeholder="Carnet de Identidad" 
              value={form.ci} 
              onChange={handleChange} 
              className={errors.ci ? 'error' : ''}
              required 
            />
            {errors.ci && <div className="error-text">{errors.ci}</div>}
          </div>

          <div className="input-group">
          <PhoneInput
            international
            defaultCountry="BO"
            countryCallingCodeEditable={false}
            limitMaxLength={true}
            placeholder="Número de teléfono"
            value={form.telefono}
            onChange={handlePhoneChange}
            className={errors.telefono ? 'error' : ''}
          />
          {errors.telefono && <div className="error-text">{errors.telefono}</div>}
        </div>

          <div className="input-group">
            <input 
              name="direccion" 
              placeholder="Dirección" 
              value={form.direccion} 
              onChange={handleChange} 
            />
          </div>

          <div className="input-group">
            <input 
              name="email" 
              placeholder="Correo electrónico" 
              value={form.email} 
              disabled 
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="input-group">
            <select 
              name="genero" 
              value={form.genero} 
              onChange={handleChange} 
              className={errors.genero ? 'error' : ''}
              required
            >
              <option value="">Seleccione un género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
            {errors.genero && <div className="error-text">{errors.genero}</div>}
          </div>

          <div className="input-group">
            <h4 className="input-group">Fecha de nacimiento</h4>
            <input 
              name="fecha_nacimiento" 
              type="date" 
              value={form.fecha_nacimiento} 
              onChange={handleChange} 
              className={errors.fecha_nacimiento ? 'error' : ''}
              min={hace100Anos}
              max={hoy}
              required 
            />
            {errors.fecha_nacimiento && <div className="error-text">{errors.fecha_nacimiento}</div>}
          </div>

          <div className="input-group">
            <select 
              name="tipo_sangre" 
              value={form.tipo_sangre} 
              onChange={handleChange} 
              className={errors.tipo_sangre ? 'error' : ''}
              required
            >
              <option value="">Seleccione un tipo de sangre</option>
              {tiposSangre.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            {errors.tipo_sangre && <div className="error-text">{errors.tipo_sangre}</div>}
          </div>

          <div className="input-group">
            <textarea 
              name="alergias" 
              placeholder="Alergias (opcional)" 
              value={form.alergias} 
              onChange={handleChange} 
              rows={3}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Completar Perfil"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Paciente;