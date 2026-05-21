import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/dashboard.css';


function Dashboard() {
  const navigate = useNavigate();
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tabActiva, setTabActiva] = useState('todas');
  const [user, setUser] = useState({ nombre: '', rol: 'Paciente' });
  const [paciente, setPaciente] = useState({});
  const [citas, setCitas] = useState([]);
  const [loadingCitas, setLoadingCitas] = useState(true);
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [formCita, setFormCita] = useState({
      id_especialidad: '',
      id_medico: '',
      fecha: '',
      hora: '',
      motivo: ''
  });
  const [notificaciones, setNotificaciones] = useState([]);
    const [noLeidas, setNoLeidas] = useState(0);
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(userData);
    setUser({ nombre: parsed.nombre || '', rol: 'Paciente' });
    const pacienteData = localStorage.getItem('paciente');
        if (pacienteData && pacienteData != 'undefined') {
            setPaciente(JSON.parse(pacienteData));
            const pacienteParseado = JSON.parse(pacienteData);
            setPaciente(pacienteParseado);
            cargarCitas(pacienteParseado.id_paciente);
            cargarNotificaciones();
        }
  }, [navigate]);
    
  /* Funcionalidades de citas en el dashboard */ 
    const cargarCitas = async (id_paciente) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/citas/paciente/${id_paciente}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
            setCitas(data.data);
        }
    } catch (error) {
        console.error('Error cargando citas:', error);
    } finally {
        setLoadingCitas(false);
    }
};
const citasFiltradas = () => {
    const hoy = new Date();
    if (tabActiva === 'proximas') return citas.filter(c => new Date(c.fecha) >= hoy);
    if (tabActiva === 'pasadas') return citas.filter(c => new Date(c.fecha) < hoy);
    return citas;
};

const cancelarCita = async (id_cita) => {
    if (!window.confirm('¿Seguro que deseas cancelar esta cita?')) return;
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/citas/${id_cita}/cancelar`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
            cargarCitas(paciente.id_paciente);
        }
    } catch (error) {
        console.error('Error cancelando cita:', error);
    }
};
const cargarEspecialidades = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/especialidades', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setEspecialidades(data.data);
    } catch (error) {
        console.error('Error cargando especialidades:', error);
    }
};

const cargarMedicosPorEspecialidad = async (id_especialidad) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/medicos/especialidad/${id_especialidad}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setMedicos(data.data);
    } catch (error) {
        console.error('Error cargando médicos:', error);
    }
};

const handleCitaChange = (e) => {
    const { name, value } = e.target;
    setFormCita(prev => ({ ...prev, [name]: value }));
    if (name === 'id_especialidad') {
        setMedicos([]);
        setFormCita(prev => ({ ...prev, id_medico: '', [name]: value }));
        if (value) cargarMedicosPorEspecialidad(value);
    }
};

const handleSubmitCita = async () => {
    if (!formCita.id_medico || !formCita.fecha || !formCita.hora) {
        alert('Completa todos los campos obligatorios');
        return;
    }
    try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/citas', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_paciente: paciente.id_paciente,
                id_medico: formCita.id_medico,
                fecha: formCita.fecha,
                hora: formCita.hora,
                motivo: formCita.motivo,
                id_usuario: JSON.parse(localStorage.getItem('user')).id
            })
        });
        const data = await res.json();
        if (data.success) {
            alert('Cita solicitada correctamente');
            setMostrarModal(false);
            setFormCita({ id_especialidad: '', id_medico: '', fecha: '', hora: '', motivo: '' });
            cargarCitas(paciente.id_paciente);
        }
    } catch (error) {
        console.error('Error creando cita:', error);
    }
};
/* Funcionalidades de notificaciones  */
const cargarNotificaciones = async () => {
    try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await fetch(`http://localhost:5000/api/notificaciones/${user.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
            setNotificaciones(data.data);
            setNoLeidas(data.noLeidas);
        }
    } catch (error) {
        console.error('Error cargando notificaciones:', error);
    }
};

const marcarLeida = async (id_notificacion) => {
    try {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/notificaciones/${id_notificacion}/leer`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        cargarNotificaciones();
    } catch (error) {
        console.error('Error marcando notificación:', error);
    }
};

const marcarTodasLeidas = async () => {
    try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        await fetch(`http://localhost:5000/api/notificaciones/usuario/${user.id}/leer-todas`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        cargarNotificaciones();
    } catch (error) {
        console.error('Error al marcar notificaciones:', error);
    }
};
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };


//  const citas = [
   // {
     // id: 1,
      //doctor: 'Javier Choque',
      //especialidad: 'Odontologia',
      //fecha: '24 de abril, Martes, 17:00',
      //avatar: 'https://ui-avatars.com/api/?name=Javier+Choque&background=ff6b6b&color=fff&rounded=true&size=150'
    //}
  //];

  //const notificaciones = [
    //{ id: 1, tipo: 'advertencia', texto: 'Tu cita de pediatria ha sido reprogramada para el 25 de abril, 3.00 PM' },
    //{ id: 2, tipo: 'advertencia', texto: 'Tu cita de odontologia ha sido reprogramada para el 29 de abril, 3.00 PM' },
    //{ id: 3, tipo: 'confirmacion', texto: 'Tu cita de odontologia ha sido confirmada para el 29 de abril, 3.00 PM' },
    //{ id: 4, tipo: 'confirmacion', texto: 'Tu cita de pediatria ha sido confirmada para el 25 de abril, 3.00 PM' },
  //];

  //const citasFiltradas = () => {
    //if (tabActiva === 'todas') return citas;
    //if (tabActiva === 'proximas') return citas;
    //if (tabActiva === 'pasadas') return [];
    //return citas;
  //};

  return (
    <div className="dashboard-container">
     

      <div className="dashboard-body">
        {/* Sidebar Izquierdo */}
        <aside className="sidebar-left">
          <nav className="side-nav">
            <a href="#" className={seccionActiva === 'inicio' ? 'active' : ''}
              onClick={e => { e.preventDefault(); setSeccionActiva('inicio'); }}>
              🏠 <span>Inicio</span>
            </a>
            <a href="#" className={seccionActiva === 'miscitas' ? 'active' : ''}
              onClick={e => { e.preventDefault(); setSeccionActiva('miscitas'); }}>
              📅 <span>Mis citas</span>
            </a>
            <a href="#" className={seccionActiva === 'notificaciones' ? 'active' : ''}
            onClick={e => { e.preventDefault(); setSeccionActiva('notificaciones'); }}>
            🔔 <span>Notificaciones</span>
            {noLeidas > 0 && <span className="badge">{noLeidas}</span>}
        </a>
            <a href="#" className={seccionActiva === 'datospaciente' ? 'active' : ''}
              onClick={e => { e.preventDefault(); setSeccionActiva('datospaciente'); }}>
              🧑‍⚕️ <span>Datos del paciente</span>
            </a>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="main-content">

          {/* INICIO */}
          {seccionActiva === 'inicio' && (
            <div id="section-inicio">
              <div className="content-header">
                <h1>Inicio</h1>
                <h2>¡Hola, {user.nombre}!</h2>
                <p className="welcome-text">Bienvenido a tu propio espacio de salud</p>
              </div>
              <div className="quick-actions">
                <h3>Acciones rapidas</h3>
                <div className="action-cards-container">
                  <div className="card green-card" onClick={() => { setMostrarModal(true); cargarEspecialidades(); }}>
                    <div className="card-header">Programar citas</div>
                    <div className="card-icon">📅</div>
                  </div>
                  <div className="card light-blue-card" onClick={() => setSeccionActiva('miscitas')}>
                    <div className="card-header">Ir a mis citas</div>
                    <div className="card-icon">✅</div>
                  </div>
                  <div className="card dark-blue-card" onClick={() => setSeccionActiva('notificaciones')}>
                    <div className="card-header">Ir a mis notificaciones</div>
                    <div className="card-icon">🔔</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MIS CITAS */}
          {seccionActiva === 'miscitas' && (
    <div id="section-miscitas">
        <div className="content-header-miscitas">
            <h1>Mis citas</h1>
            <div className="miscitas-controls">
                <div className="tabs">
                    {['todas', 'proximas', 'pasadas'].map(tab => (
                        <button 
                            key={tab}
                            className={`btn-las-citas tab-btn ${tabActiva === tab ? 'active' : ''}`}
                            onClick={() => setTabActiva(tab)}
                        >
                            {tab === 'todas' ? 'Todas las citas' : tab === 'proximas' ? 'Proximas citas' : 'Citas pasadas'}
                        </button>
                    ))}
                </div>
                <button className="btn-ver-citas" onClick={() => { setMostrarModal(true); cargarEspecialidades(); }}>
                    + Solicitar cita
                </button>
            </div>
        </div>

        <div className="miscitas-list">
            {loadingCitas ? (
                <p style={{ padding: '20px', color: '#888' }}>Cargando citas...</p>
            ) : citasFiltradas().length === 0 ? (
                <p style={{ padding: '20px', color: '#888' }}>No hay citas en esta categoría.</p>
            ) : (
                citasFiltradas().map(cita => (
                    <div key={cita.id_cita} className="appointment-card">
                        <div className="appointment-details">
                            <p className="appointment-date">{cita.fecha} — {cita.hora}</p>
                            <h3 className="appointment-doctor">Dr. {cita.medico_nombre} {cita.medico_apellido}</h3>
                            <p className="appointment-specialty">{cita.motivo}</p>
                            <span className={`estado-badge estado-${cita.estado?.toLowerCase()}`}>
                                {cita.estado}
                            </span>
                        </div>
                        {cita.estado === 'Pendiente' && (
                            <div className="appointment-action">
                                <button
                                    className="btn-cancelar"
                                    onClick={() => cancelarCita(cita.id_cita)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    </div>
)}

          {/* NOTIFICACIONES */}
          {seccionActiva === 'notificaciones' && (
    <div id="section-notificaciones">
        <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Notificaciones</h1>
            {noLeidas > 0 && (
                <button className="btn-ver-citas" onClick={marcarTodasLeidas}>
                    Marcar todas como leídas
                </button>
            )}
        </div>
        <div className="notifications-list">
            {notificaciones.length === 0 ? (
                <p style={{ padding: '20px', color: '#888' }}>No hay notificaciones.</p>
            ) : (
                notificaciones.map(n => (
                    <div key={n.id_notificacion}
                        className={`notification-item ${n.leido ? '' : 'no-leida'}`}
                        onClick={() => !n.leido && marcarLeida(n.id_notificacion)}
                        style={{ cursor: n.leido ? 'default' : 'pointer' }}
                    >
                        <div className={`notification-icon ${n.leido ? 'bg-green' : 'bg-yellow'}`}>
                            {n.leido ? '✅' : '🔔'}
                        </div>
                        <div className="notification-text">
                            <strong>{n.titulo}</strong>
                            <p>{n.mensaje}</p>
                            <small>{new Date(n.fecha).toLocaleDateString('es-ES')}</small>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
)}
          {/* DATOS DEL PACIENTE */}
          {seccionActiva === 'datospaciente' && (
            <div id="section-datospaciente">
              <div className="content-header">
                <h1>Datos del paciente</h1>
              </div>
              <div className="patient-data-container">
                <div className="patient-large-icon">👤</div>
                <div className="patient-details-list">
                  <p><strong>Nombre completo:</strong> {user.nombre}</p>
                  <p><strong>Correo:</strong> {JSON.parse(localStorage.getItem('user') || '{}').email}</p>
                  <p><strong>Teléfono:</strong> {paciente.telefono || 'No registrado'}</p>
                  <p><strong>Dirección:</strong> {paciente.direccion || 'No registrada'}</p>

                </div>
              </div>
            </div>
          )}

        </main>

        {/* Sidebar Derecho */}
        {seccionActiva === 'inicio' && (
          <aside className="sidebar-right">
            <div className="profile-section">
              <div className="large-avatar">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
              <h2 className="profile-name">{user.nombre}</h2>
              <p className="profile-role">{user.rol} - Uroclinic</p>
              {paciente.tipo_sangre && (
              <p className="profile-role">Tipo de sangre: 🩸 {paciente.tipo_sangre}</p>
              )}
              <p className="profile-role"> CI: {paciente.ci} </p>
              </div>
          </aside>
        )}
      </div>

      {/* MODAL AGREGAR CITA */}
      {mostrarModal && (
    <div className="modal-overlay" onClick={e => { if (e.target.classList.contains('modal-overlay')) setMostrarModal(false); }}>
        <div className="modal-content">
            <div className="modal-header">
                <h2>Solicitar Cita</h2>
                <button className="close-btn" onClick={() => setMostrarModal(false)}>×</button>
            </div>
            <div className="modal-body">
                <div className="modal-form">
                    <div className="form-group">
                        <label>Especialidad:</label>
                        <select name="id_especialidad" value={formCita.id_especialidad} onChange={handleCitaChange}>
                            <option value="">Seleccione especialidad</option>
                            {especialidades.map(e => (
                                <option key={e.id_especialidad} value={e.id_especialidad}>{e.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Médico:</label>
                        <select name="id_medico" value={formCita.id_medico} onChange={handleCitaChange} disabled={!formCita.id_especialidad}>
                            <option value="">Seleccione médico</option>
                            {medicos.map(m => (
                                <option key={m.id_medico} value={m.id_medico}>Dr. {m.nombre} {m.apellido}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Fecha:</label>
                        <input type="date" name="fecha" value={formCita.fecha} onChange={handleCitaChange}
                            min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="form-group">
                        <label>Hora:</label>
                        <input type="time" name="hora" value={formCita.hora} onChange={handleCitaChange} />
                    </div>
                    <div className="form-group">
                        <label>Motivo:</label>
                        <textarea name="motivo" value={formCita.motivo} onChange={handleCitaChange}
                            placeholder="Describe el motivo de tu consulta" rows={3} />
                    </div>
                </div>
                <div className="modal-date-action">
                    <button className="btn-agregar-cita" onClick={handleSubmitCita}>
                        Solicitar cita
                    </button>
                </div>
            </div>
        </div>
    </div>
)}
    </div>
  );
}

export default Dashboard;