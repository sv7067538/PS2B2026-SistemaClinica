import React, { useState } from 'react';
import './DoctorDashboard.css';

// Existing Icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const PatientsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <line x1="12" y1="11" x2="12" y2="17"></line>
    <line x1="9" y1="14" x2="15" y2="14"></line>
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    <line x1="12" y1="11" x2="12" y2="17"></line>
    <line x1="9" y1="14" x2="15" y2="14"></line>
  </svg>
);

const AppointmentsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <circle cx="12" cy="16" r="3"></circle>
    <line x1="12" y1="14" x2="12" y2="18"></line>
    <line x1="10" y1="16" x2="14" y2="16"></line>
  </svg>
);

const LogoIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
    <circle cx="12" cy="12" r="12" fill="#0070f3" />
    <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const BigPatientIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <line x1="19" y1="8" x2="19" y2="14"></line>
    <line x1="16" y1="11" x2="22" y2="11"></line>
  </svg>
);

const BigFolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    <line x1="12" y1="11" x2="12" y2="17"></line>
    <line x1="9" y1="14" x2="15" y2="14"></line>
    <rect x="6" y="2" width="12" height="8" rx="1"></rect>
    <circle cx="12" cy="5" r="1.5"></circle>
  </svg>
);

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modals state
  const [modalMode, setModalMode] = useState(null); // 'addPatient', 'viewPatient', 'editPatient', 'addHistorial', 'viewHistorial', 'editHistorial'
  
  // Patients State
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState('Todos');
  
  const [patients, setPatients] = useState([
    {
      id: 1, nombre: 'Juan Perez', edad: '30', ci: '123455676', telefono: '7683929329',
      fechaNacimiento: { dd: '01', mm: '04', yyyy: '2000' }, tipoSangre: 'ORH+', alergias: 'Ninguna'
    }
  ]);

  const [formData, setFormData] = useState({
    nombre: '', edad: '', ci: '', telefono: '',
    fechaNacimiento: { dd: '', mm: '', yyyy: '' },
    tipoSangre: '', alergias: ''
  });

  // Historial State
  const [searchQueryHistorial, setSearchQueryHistorial] = useState('');
  const [selectedHistorial, setSelectedHistorial] = useState(null);
  
  const [historiales, setHistoriales] = useState([
    {
      id: 1, paciente: 'Juan Perez', fecha: { dd: '14', mm: '02', yyyy: '2023' },
      motivo: 'Dolor de cabeza', diagnostico: 'Gripe', tratamiento: 'Paracetamol',
      observaciones: 'Reposo 3 dias', alergias: 'Ninguna', estado: 'Activo'
    }
  ]);

  const [formHistorial, setFormHistorial] = useState({
    paciente: '', fecha: { dd: '', mm: '', yyyy: '' },
    motivo: '', diagnostico: '', tratamiento: '', observaciones: '', alergias: ''
  });

  // Citas State
  const [selectedCita, setSelectedCita] = useState(null);
  
  const [citas, setCitas] = useState([
    {
      id: 1, paciente: 'Juan Perez', fecha: { dd: '23', mm: '03', yyyy: '2025' },
      hora: '12:00 am', estado: 'Pendiente', motivo: 'Control general'
    }
  ]);

  const [formCita, setFormCita] = useState({
    paciente: '', fecha: { dd: '', mm: '', yyyy: '' },
    hora: '', estado: '', motivo: ''
  });

  const upcomingAppointments = [
    { time: '10:00', patient: 'Juan Pérez' },
    { time: '11:30', patient: 'Ana López' },
    { time: '13:00', patient: 'Carlos Ruiz' },
    { time: '14:00', patient: 'Juan Pérez' },
    { time: '15:30', patient: 'Ana López' },
    { time: '17:00', patient: 'Carlos Ruiz' },
  ];

  const handleOpenModal = (mode, data = null) => {
    setModalMode(mode);
    if (mode.includes('Patient')) {
      if (data) {
        setSelectedPatient(data);
        setFormData(data);
      } else {
        setSelectedPatient(null);
        setFormData({ nombre: '', edad: '', ci: '', telefono: '', fechaNacimiento: { dd: '', mm: '', yyyy: '' }, tipoSangre: '', alergias: '' });
      }
    } else if (mode.includes('Historial')) {
      if (data) {
        setSelectedHistorial(data);
        setFormHistorial(data);
      } else {
        setSelectedHistorial(null);
        setFormHistorial({ paciente: '', fecha: { dd: '', mm: '', yyyy: '' }, motivo: '', diagnostico: '', tratamiento: '', observaciones: '', alergias: '' });
      }
    } else if (mode.includes('Cita')) {
      if (data) {
        setSelectedCita(data);
        setFormCita(data);
      } else {
        setSelectedCita(null);
        setFormCita({ paciente: '', fecha: { dd: '', mm: '', yyyy: '' }, hora: '', estado: '', motivo: '' });
      }
    }
  };

  const handleCloseModal = () => {
    setModalMode(null);
  };

  // Patient Handlers
  const handleChangePatient = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChangePatient = (field, value) => {
    setFormData(prev => ({ ...prev, fechaNacimiento: { ...prev.fechaNacimiento, [field]: value } }));
  };

  const handleSavePatient = () => {
    if (modalMode === 'addPatient') {
      setPatients([...patients, { ...formData, id: Date.now() }]);
    } else if (modalMode === 'editPatient') {
      setPatients(patients.map(p => p.id === selectedPatient.id ? { ...formData, id: p.id } : p));
    }
    handleCloseModal();
  };

  const handleDeletePatient = (id) => {
    if(window.confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  // Historial Handlers
  const handleChangeHistorial = (e) => {
    const { name, value } = e.target;
    setFormHistorial(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChangeHistorial = (field, value) => {
    setFormHistorial(prev => ({ ...prev, fecha: { ...prev.fecha, [field]: value } }));
  };

  const handleSaveHistorial = () => {
    if (modalMode === 'addHistorial') {
      setHistoriales([...historiales, { ...formHistorial, estado: 'Activo', id: Date.now() }]);
    } else if (modalMode === 'editHistorial') {
      setHistoriales(historiales.map(h => h.id === selectedHistorial.id ? { ...formHistorial, estado: h.estado, id: h.id } : h));
    }
    handleCloseModal();
  };

  // Citas Handlers
  const handleChangeCita = (e) => {
    const { name, value } = e.target;
    setFormCita(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChangeCita = (field, value) => {
    setFormCita(prev => ({ ...prev, fecha: { ...prev.fecha, [field]: value } }));
  };

  const handleSaveCita = () => {
    if (modalMode === 'addCita') {
      setCitas([...citas, { ...formCita, id: Date.now() }]);
    } else if (modalMode === 'editCita') {
      setCitas(citas.map(c => c.id === selectedCita.id ? { ...formCita, id: c.id } : c));
    }
    handleCloseModal();
  };

  const handleDeleteCita = (id) => {
    if(window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      setCitas(citas.filter(c => c.id !== id));
    }
  };

  // Filters
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || patient.ci.includes(searchQuery);
    const matchesBloodType = selectedBloodType === 'Todos' || patient.tipoSangre === selectedBloodType;
    return matchesSearch && matchesBloodType;
  });

  const filteredHistoriales = historiales.filter(h => {
    return h.paciente.toLowerCase().includes(searchQueryHistorial.toLowerCase()) || 
           h.diagnostico.toLowerCase().includes(searchQueryHistorial.toLowerCase());
  });

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
          <HomeIcon /> Dashboard
        </div>
        <div onClick={() => setActiveTab('pacientes')} className={`nav-item ${activeTab === 'pacientes' ? 'active' : ''}`}>
          <PatientsIcon /> Pacientes
        </div>
        <div onClick={() => setActiveTab('historial')} className={`nav-item ${activeTab === 'historial' ? 'active' : ''}`}>
          <HistoryIcon /> Historial
        </div>
        <div onClick={() => setActiveTab('citas')} className={`nav-item ${activeTab === 'citas' ? 'active' : ''}`}>
          <AppointmentsIcon /> Citas
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-title">
            <LogoIcon />
            SISTEMA CLINICO
          </div>
          <div className="profile-icon">
            <UserIcon />
          </div>
        </header>

        <div className="content-wrapper">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <>
              <h1 className="page-title animate-fade-in">Dashboard</h1>
              <div className="stats-grid">
                <div className="stat-card animate-fade-in delay-1">
                  <div className="stat-info">
                    <h3>Pacientes hoy:</h3>
                    <p className="value">8</p>
                  </div>
                  <div className="stat-icon"><PatientsIcon /></div>
                </div>
                <div className="stat-card animate-fade-in delay-2">
                  <div className="stat-info">
                    <h3>Citas hoy:</h3>
                    <p className="value">12</p>
                  </div>
                  <div className="stat-icon"><AppointmentsIcon /></div>
                </div>
                <div className="stat-card animate-fade-in delay-3">
                  <div className="stat-info">
                    <h3>Historiales:</h3>
                    <p className="value">5</p>
                  </div>
                  <div className="stat-icon"><HistoryIcon /></div>
                </div>
              </div>

              <h2 className="section-title animate-fade-in delay-1">Próximas citas</h2>
              <div className="appointments-container animate-fade-in delay-2">
                <div className="appointments-list">
                  {upcomingAppointments.map((apt, index) => (
                    <div key={index} className="appointment-item">
                      <span className="appointment-time">{apt.time}</span>
                      <span className="appointment-name">- {apt.patient}</span>
                    </div>
                  ))}
                </div>
                <div className="appointments-illustration"><AppointmentsIcon /></div>
              </div>
            </>
          )}

          {/* PACIENTES VIEW */}
          {activeTab === 'pacientes' && (
            <>
              <h1 className="page-title animate-fade-in">Pacientes</h1>
              
              <div className="patients-header-actions animate-fade-in delay-1" style={{position: 'relative', zIndex: 10}}>
                <div className="search-bar">
                  <SearchIcon />
                  <input 
                    type="text" 
                    placeholder="Buscar por nombre o CI..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div style={{position: 'relative'}}>
                  <button className="btn btn-filter" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                    <FilterIcon /> Filtrar
                  </button>
                  {showFilterDropdown && (
                    <div style={{position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', zIndex: 50, boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                      <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600}}>Tipo de sangre:</label>
                      <select 
                        value={selectedBloodType} 
                        onChange={(e) => setSelectedBloodType(e.target.value)}
                        style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e2e8f0'}}
                      >
                        <option value="Todos">Todos</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="ORH+">ORH+</option>
                      </select>
                    </div>
                  )}
                </div>
                <button className="btn btn-primary" onClick={() => handleOpenModal('addPatient')}>
                  <PlusIcon /> Nuevo
                </button>
              </div>

              <div className="patients-table-container animate-fade-in delay-2">
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>CI</th>
                      <th>Telefono</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.nombre}</td>
                        <td>{patient.edad}</td>
                        <td>{patient.ci}</td>
                        <td>{patient.telefono}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-sm btn-view" onClick={() => handleOpenModal('viewPatient', patient)}>Ver</button>
                            <button className="btn-sm btn-edit" onClick={() => handleOpenModal('editPatient', patient)}>Editar</button>
                            <button className="btn-sm btn-delete" onClick={() => handleDeletePatient(patient.id)}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="empty-state">No se encontraron pacientes</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* HISTORIAL VIEW */}
          {activeTab === 'historial' && (
            <>
              <h1 className="page-title animate-fade-in">Historial Clinico</h1>
              
              <div className="patients-header-actions animate-fade-in delay-1" style={{position: 'relative', zIndex: 10}}>
                <div className="search-bar">
                  <SearchIcon />
                  <input 
                    type="text" 
                    placeholder="Buscar por paciente o diagnostico..." 
                    value={searchQueryHistorial}
                    onChange={(e) => setSearchQueryHistorial(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={() => handleOpenModal('addHistorial')}>
                  <PlusIcon /> Nuevo Historial
                </button>
              </div>

              <div className="patients-table-container animate-fade-in delay-2">
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Fecha</th>
                      <th>Diagnostico</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistoriales.length > 0 ? filteredHistoriales.map((h) => (
                      <tr key={h.id}>
                        <td>{h.paciente}</td>
                        <td>{`${h.fecha.dd}/${h.fecha.mm}/${h.fecha.yyyy}`}</td>
                        <td>{h.diagnostico}</td>
                        <td>{h.estado}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-sm btn-view" onClick={() => handleOpenModal('viewHistorial', h)}>Ver</button>
                            <button className="btn-sm btn-edit" onClick={() => handleOpenModal('editHistorial', h)}>Editar</button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="empty-state">Los historiales clinicos apareceran aqui</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* CITAS VIEW */}
          {activeTab === 'citas' && (
            <>
              <h1 className="page-title animate-fade-in">Citas</h1>
              
              <div className="patients-header-actions animate-fade-in delay-1" style={{justifyContent: 'flex-end'}}>
                <button className="btn btn-primary" onClick={() => handleOpenModal('addCita')}>
                  <PlusIcon /> Nueva cita
                </button>
              </div>

              <div className="patients-table-container animate-fade-in delay-2">
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Estado</th>
                      <th>Motivo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.length > 0 ? citas.map((cita) => (
                      <tr key={cita.id}>
                        <td>{cita.paciente}</td>
                        <td>{`${cita.fecha.dd}/${cita.fecha.mm}/${cita.fecha.yyyy}`}</td>
                        <td>{cita.hora}</td>
                        <td>{cita.estado}</td>
                        <td>{cita.motivo}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-sm btn-edit" onClick={() => handleOpenModal('editCita', cita)}>Editar</button>
                            <button className="btn-sm btn-delete" onClick={() => handleDeleteCita(cita.id)}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="empty-state">Las citas apareceran aqui</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>
      </main>

      {/* MODALS */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="modal-left">
              <h2>
                {modalMode === 'addPatient' ? 'Agregar paciente' : 
                 modalMode === 'viewPatient' ? 'Ver paciente' : 
                 modalMode === 'editPatient' ? 'Editar paciente' : 
                 modalMode === 'addHistorial' ? 'Agregar Historial Clinico' :
                 modalMode === 'viewHistorial' ? 'Ver Historial Clinico' : 
                 modalMode === 'editHistorial' ? 'Editar Historial Clinico' :
                 modalMode === 'addCita' ? 'Agregar Cita' : 'Editar Cita'}
              </h2>
              {modalMode.includes('Patient') ? <BigPatientIcon /> : 
               modalMode.includes('Historial') ? <BigFolderIcon /> : <AppointmentsIcon style={{width: '100px', height: '100px', color: 'var(--secondary-color)'}}/>}
            </div>

            <div className="modal-right">
              {modalMode.includes('Patient') ? (
                /* Patient Form */
                <div className="form-grid">
                  <div className="form-group">
                    <label>{modalMode === 'viewPatient' ? 'Nombre:' : 'Paciente'}</label>
                    <input 
                      type="text" name="nombre" placeholder="Ingrese el nombre completo del paciente" 
                      value={formData.nombre} onChange={handleChangePatient} readOnly={modalMode === 'viewPatient'}
                    />
                  </div>

                  <div className="form-group">
                    <label>Tipo de sangre:</label>
                    {modalMode === 'viewPatient' ? (
                      <input type="text" name="tipoSangre" value={formData.tipoSangre} readOnly />
                    ) : (
                      <select 
                        name="tipoSangre" value={formData.tipoSangre} onChange={handleChangePatient}
                        style={{background: 'transparent', border: 'none', borderBottom: '1px solid #cbd5e0', padding: '0.5rem 0', outline: 'none', color: 'var(--text-dark)', fontSize: '1rem'}}
                      >
                        <option value="" disabled>Seleccione...</option>
                        <option value="A+">A+</option><option value="A-">A-</option>
                        <option value="B+">B+</option><option value="B-">B-</option>
                        <option value="AB+">AB+</option><option value="AB-">AB-</option>
                        <option value="O+">O+</option><option value="O-">O-</option>
                        <option value="ORH+">ORH+</option>
                      </select>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Edad:</label>
                    <input type="text" name="edad" placeholder="Ingrese edad" value={formData.edad} onChange={handleChangePatient} readOnly={modalMode === 'viewPatient'} />
                  </div>

                  <div className="form-group">
                    <label>Alergias:</label>
                    <input type="text" name="alergias" placeholder="Ingrese alergias" value={formData.alergias} onChange={handleChangePatient} readOnly={modalMode === 'viewPatient'} />
                  </div>

                  <div className="form-group">
                    <label>CI:</label>
                    <input type="text" name="ci" placeholder="Ingrese el CI del paciente" value={formData.ci} onChange={handleChangePatient} readOnly={modalMode === 'viewPatient'} />
                  </div>

                  {modalMode !== 'viewPatient' && (
                    <>
                      <div className="form-group" style={{gridColumn: '1 / -1'}}>
                        <label>Fecha de nacimiento</label>
                        <div className="date-inputs">
                          <input type="text" placeholder="DD" value={formData.fechaNacimiento.dd} onChange={e => handleDateChangePatient('dd', e.target.value)} />
                          <input type="text" placeholder="MM" value={formData.fechaNacimiento.mm} onChange={e => handleDateChangePatient('mm', e.target.value)} />
                          <input type="text" placeholder="YYYY" style={{width: '70px'}} value={formData.fechaNacimiento.yyyy} onChange={e => handleDateChangePatient('yyyy', e.target.value)} />
                        </div>
                      </div>
                      <div className="form-group" style={{gridColumn: '1 / -1'}}>
                        <label>Telefono</label>
                        <input type="text" name="telefono" placeholder="Ingrese el telefono del paciente" value={formData.telefono} onChange={handleChangePatient} />
                      </div>
                    </>
                  )}

                  {modalMode === 'viewPatient' && (
                    <>
                      <div className="form-group">
                        <label>Telefono:</label>
                        <input type="text" value={formData.telefono} readOnly />
                      </div>
                      <div className="form-group" style={{gridColumn: '1 / -1'}}>
                        <label>Fecha de nacimiento</label>
                        <div className="date-inputs">
                          <input type="text" value={formData.fechaNacimiento.dd} readOnly />
                          <input type="text" value={formData.fechaNacimiento.mm} readOnly />
                          <input type="text" style={{width: '70px'}} value={formData.fechaNacimiento.yyyy} readOnly />
                        </div>
                      </div>
                    </>
                  )}

                  {modalMode === 'addPatient' && (
                    <div className="modal-actions">
                      <button className="btn btn-primary" onClick={handleSavePatient}>Agregar paciente</button>
                    </div>
                  )}
                  {modalMode === 'editPatient' && (
                    <div className="modal-actions" style={{justifyContent: 'flex-start'}}>
                      <button className="btn btn-primary" onClick={handleSavePatient}>Guardar</button>
                      <button className="btn btn-cancel" onClick={handleCloseModal}>Cancelar</button>
                    </div>
                  )}
                </div>
              ) : modalMode.includes('Historial') ? (
                /* Historial Form */
                <div className="form-grid">
                  <div className="form-group">
                    <label>Paciente:</label>
                    <input 
                      type="text" name="paciente" placeholder="Ingrese el nombre del paciente" 
                      value={formHistorial.paciente} onChange={handleChangeHistorial} readOnly={modalMode === 'viewHistorial'}
                    />
                  </div>

                  <div className="form-group" style={{gridRow: '1 / span 2', gridColumn: '2'}}>
                    <label>Fecha:</label>
                    <div className="date-inputs">
                      <input type="text" placeholder="DD" value={formHistorial.fecha.dd} onChange={e => handleDateChangeHistorial('dd', e.target.value)} readOnly={modalMode === 'viewHistorial'} />
                      <input type="text" placeholder="MM" value={formHistorial.fecha.mm} onChange={e => handleDateChangeHistorial('mm', e.target.value)} readOnly={modalMode === 'viewHistorial'} />
                      <input type="text" placeholder="YYYY" style={{width: '70px'}} value={formHistorial.fecha.yyyy} onChange={e => handleDateChangeHistorial('yyyy', e.target.value)} readOnly={modalMode === 'viewHistorial'} />
                    </div>
                    {/* Buttons positioned under date for Edit/Add to match design */}
                    {modalMode === 'editHistorial' && (
                      <div className="modal-actions" style={{justifyContent: 'flex-start', marginTop: '2rem'}}>
                        <button className="btn btn-primary" onClick={handleSaveHistorial}>Guardar</button>
                        <button className="btn btn-cancel" onClick={handleCloseModal}>Cancelar</button>
                      </div>
                    )}
                    {modalMode === 'addHistorial' && (
                      <div className="modal-actions" style={{justifyContent: 'flex-start', marginTop: '4rem'}}>
                        <button className="btn btn-primary" onClick={handleSaveHistorial}>Agregar Historial</button>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Motivo:</label>
                    <input type="text" name="motivo" placeholder="Ingrese el motivo" value={formHistorial.motivo} onChange={handleChangeHistorial} readOnly={modalMode === 'viewHistorial'} />
                  </div>

                  <div className="form-group" style={{gridColumn: '1'}}>
                    <label>Diagnostico:</label>
                    <input type="text" name="diagnostico" placeholder="Ingrese diagnostico" value={formHistorial.diagnostico} onChange={handleChangeHistorial} readOnly={modalMode === 'viewHistorial'} />
                  </div>

                  <div className="form-group" style={{gridColumn: '1'}}>
                    <label>Tratamiento:</label>
                    <input type="text" name="tratamiento" placeholder="Ingrese el tratamiento" value={formHistorial.tratamiento} onChange={handleChangeHistorial} readOnly={modalMode === 'viewHistorial'} />
                  </div>

                  <div className="form-group" style={{gridColumn: '1'}}>
                    <label>Observaciones:</label>
                    <input type="text" name="observaciones" placeholder="Ingrese una observacion" value={formHistorial.observaciones} onChange={handleChangeHistorial} readOnly={modalMode === 'viewHistorial'} />
                  </div>

                  <div className="form-group" style={{gridColumn: '1'}}>
                    <label>Alergias:</label>
                    <input type="text" name="alergias" placeholder="Ingrese si tiene alergias" value={formHistorial.alergias} onChange={handleChangeHistorial} readOnly={modalMode === 'viewHistorial'} />
                  </div>

                </div>
              ) : modalMode.includes('Cita') ? (
                /* Citas Form */
                <div className="form-grid">
                  <div className="form-group">
                    <label>Paciente:</label>
                    <input 
                      type="text" name="paciente" placeholder="Ingrese paciente" 
                      value={formCita.paciente} onChange={handleChangeCita}
                    />
                  </div>

                  <div className="form-group" style={{gridRow: '1 / span 2', gridColumn: '2'}}>
                    <label>Fecha:</label>
                    <div className="date-inputs">
                      <input type="text" placeholder="DD" value={formCita.fecha.dd} onChange={e => handleDateChangeCita('dd', e.target.value)} />
                      <input type="text" placeholder="MM" value={formCita.fecha.mm} onChange={e => handleDateChangeCita('mm', e.target.value)} />
                      <input type="text" placeholder="YYYY" style={{width: '70px'}} value={formCita.fecha.yyyy} onChange={e => handleDateChangeCita('yyyy', e.target.value)} />
                    </div>
                    {/* Buttons positioned under date */}
                    {modalMode === 'editCita' && (
                      <div className="modal-actions" style={{justifyContent: 'flex-start', marginTop: '2rem'}}>
                        <button className="btn btn-primary" onClick={handleSaveCita}>Guardar</button>
                        <button className="btn btn-cancel" onClick={handleCloseModal}>Cancelar</button>
                      </div>
                    )}
                    {modalMode === 'addCita' && (
                      <div className="modal-actions" style={{justifyContent: 'flex-start', marginTop: '4rem'}}>
                        <button className="btn btn-primary" onClick={handleSaveCita}>Agregar cita</button>
                      </div>
                    )}
                  </div>

                  <div className="form-group" style={{gridColumn: '1'}}>
                    <label>Hora:</label>
                    <input type="text" name="hora" placeholder="Ingrese hora" value={formCita.hora} onChange={handleChangeCita} />
                  </div>

                  <div className="form-group" style={{gridColumn: '1'}}>
                    <label>Estado:</label>
                    <input type="text" name="estado" placeholder="Ingrese estado" value={formCita.estado} onChange={handleChangeCita} />
                  </div>

                  <div className="form-group" style={{gridColumn: '1'}}>
                    <label>Motivo:</label>
                    <input type="text" name="motivo" placeholder="Ingrese motivo de la cita" value={formCita.motivo} onChange={handleChangeCita} />
                  </div>

                </div>
              ) : null}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
