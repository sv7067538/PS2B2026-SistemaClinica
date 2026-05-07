import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tabActiva, setTabActiva] = useState('todas');
  const [user, setUser] = useState({ nombre: '', rol: 'Paciente' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(userData);
    setUser({ nombre: parsed.nombre || '', rol: 'Paciente' });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const citas = [
    {
      id: 1,
      doctor: 'Javier Choque',
      especialidad: 'Odontologia',
      fecha: '24 de abril, Martes, 17:00',
      avatar: 'https://ui-avatars.com/api/?name=Javier+Choque&background=ff6b6b&color=fff&rounded=true&size=150'
    }
  ];

  const notificaciones = [
    { id: 1, tipo: 'advertencia', texto: 'Tu cita de pediatria ha sido reprogramada para el 25 de abril, 3.00 PM' },
    { id: 2, tipo: 'advertencia', texto: 'Tu cita de odontologia ha sido reprogramada para el 29 de abril, 3.00 PM' },
    { id: 3, tipo: 'confirmacion', texto: 'Tu cita de odontologia ha sido confirmada para el 29 de abril, 3.00 PM' },
    { id: 4, tipo: 'confirmacion', texto: 'Tu cita de pediatria ha sido confirmada para el 25 de abril, 3.00 PM' },
  ];

  const citasFiltradas = () => {
    if (tabActiva === 'todas') return citas;
    if (tabActiva === 'proximas') return citas;
    if (tabActiva === 'pasadas') return [];
    return citas;
  };

  return (
    <div className="dashboard-container">
      {/* Topbar */}
      <header className="topbar">
        <div className="logo-container">
          <div className="logo-circle">+</div>
          SISTEMA CLINICO
        </div>
        <div className="user-menu">
          <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
          <div className="user-icon-small">👤</div>
        </div>
      </header>

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
                  <div className="card green-card" onClick={() => setMostrarModal(true)}>
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
                        className={`tab-btn ${tabActiva === tab ? 'active' : ''}`}
                        onClick={() => setTabActiva(tab)}
                      >
                        {tab === 'todas' ? 'Todas las citas' : tab === 'proximas' ? 'Proximas citas' : 'Citas pasadas'}
                      </button>
                      
                    ))}
                  </div>
                  <button className="btn-ver-citas" onClick={() => navigate('/mis-citas')}>
                    Ver todas mis citas
                    </button>
                  <div className="search-bar">
                    <span>☰</span>
                    <input type="text" placeholder="Buscar..." />
                    <span>🔍</span>
                  </div>
                </div>
              </div>
              <div className="miscitas-list">
                {citasFiltradas().length === 0 ? (
                  <p style={{ padding: '20px', color: '#888' }}>No hay citas en esta categoría.</p>
                ) : (
                  citasFiltradas().map(cita => (
                    <div key={cita.id} className="appointment-card">
                      <div className="appointment-avatar">
                        <img src={cita.avatar} alt={`Dr. ${cita.doctor}`} />
                      </div>
                      <div className="appointment-details">
                        <p className="appointment-date">{cita.fecha}</p>
                        <h3 className="appointment-doctor">Dr. {cita.doctor}</h3>
                        <p className="appointment-specialty">{cita.especialidad}</p>
                      </div>
                      <div className="appointment-action">
                        <button className="btn-contactar">Contactar medico</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* NOTIFICACIONES */}
          {seccionActiva === 'notificaciones' && (
            <div id="section-notificaciones">
              <div className="content-header">
                <h1>Notificaciones</h1>
              </div>
              <div className="notifications-list">
                {notificaciones.map(n => (
                  <div key={n.id} className="notification-item">
                    <div className={`notification-icon ${n.tipo === 'advertencia' ? 'bg-yellow' : 'bg-green'}`}>
                      {n.tipo === 'advertencia' ? '⚠️' : '✅'}
                    </div>
                    <div className="notification-text">{n.texto}</div>
                  </div>
                ))}
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
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Sidebar Derecho - solo en inicio */}
        {seccionActiva === 'inicio' && (
          <aside className="sidebar-right">
            <div className="profile-section">
              <div className="large-avatar">
                <div className="avatar-icon">👨‍⚕️</div>
              </div>
              <h2 className="profile-name">{user.nombre}</h2>
              <p className="profile-role">{user.rol} - Uroclinic</p>
            </div>
          </aside>
        )}
      </div>

      {/* MODAL AGREGAR CITA */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={e => { if (e.target.classList.contains('modal-overlay')) setMostrarModal(false); }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Agregar Cita</h2>
              <button className="close-btn" onClick={() => setMostrarModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-icon" style={{ textAlign: 'center', fontSize: '80px' }}>📅</div>
              <div className="modal-form">
                <div className="form-group">
                  <label>Paciente:</label>
                  <input type="text" placeholder="Ingrese paciente" />
                </div>
                <div className="form-group">
                  <label>Hora:</label>
                  <input type="text" placeholder="Ingrese hora" />
                </div>
                <div className="form-group">
                  <label>Estado:</label>
                  <input type="text" placeholder="Ingrese estado" />
                </div>
                <div className="form-group">
                  <label>Motivo:</label>
                  <input type="text" placeholder="Ingrese motivo de la cita" />
                </div>
              </div>
              <div className="modal-date-action">
                <div className="date-group">
                  <label>Fecha:</label>
                  <div className="date-inputs">
                    <input type="text" placeholder="DD" maxLength="2" className="date-part" />
                    <input type="text" placeholder="MM" maxLength="2" className="date-part" />
                    <input type="text" placeholder="YYYY" maxLength="4" className="date-part year" />
                  </div>
                </div>
                <button className="btn-agregar-cita">Agregar cita</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;