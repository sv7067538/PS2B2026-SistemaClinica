import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function CompletarPerfilMedico() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    cargo: "",
    id_especialidad: "",
    id_clinica: "",
    id_usuario: null
  });
  const [especialidades, setEspecialidades] = useState([]);
  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
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
    
    // Cargar especialidades
   const cargarEspecialidades = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/especialidades', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Respuesta especialidades:', response.data);
        if (Array.isArray(response.data)) {
            setEspecialidades(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
            setEspecialidades(response.data.data);
        } else {
            console.error('No es un array:', response.data);
            setEspecialidades([]);
        }
    } catch (error) {
        console.error('Error cargando especialidades:', error);
        setEspecialidades([]);
    }
};

    // Cargar clínicas
    const cargarClinicas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/clinicas', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setClinicas(response.data);
      } catch (error) {
        console.error('Error cargando clínicas:', error);
      }
    };

    cargarEspecialidades();
    cargarClinicas();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
const handlePhoneChange = (value) => {
        setForm({ ...form, telefono: value });
        if (errors.telefono) setErrors({ ...errors, telefono: "" });
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.id_especialidad) {
      setError("Debe seleccionar una especialidad");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:5000/api/medicos", form, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      alert("Perfil médico completado correctamente");
      navigate("/medico/dashboard");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al guardar el perfil";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Completar Perfil Médico</h2>
        <p className="subtitle">Ingresa tus datos profesionales</p>

        {error && <div className="error-text general-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input name="nombre" placeholder="Nombres" value={form.nombre} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <input name="apellido" placeholder="Apellidos" value={form.apellido} onChange={handleChange} required />
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
          />
      </div>

          <div className="input-group">
            <input name="email" value={form.email} disabled />
          </div>

          <div className="input-group">
            <input name="cargo" placeholder="Cargo" onChange={handleChange} />
          </div>

          <div className="input-group">
            <select name="id_especialidad" value={form.id_especialidad} onChange={handleChange} required>
              <option value="">Seleccione especialidad</option>
              {Array.isArray(especialidades) && especialidades.map(esp => (
                <option key={esp.id_especialidad} value={esp.id_especialidad}>
                  {esp.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <select name="id_clinica" value={form.id_clinica} onChange={handleChange} required>
              <option value="">Seleccione clínica</option>
              {clinicas.map(cli => (
                <option key={cli.id_clinica} value={cli.id_clinica}>
                  {cli.nombre}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Completar Perfil Médico"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompletarPerfilMedico;