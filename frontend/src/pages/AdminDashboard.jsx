import React, { useState } from 'react';
import './DoctorDashboard.css';
import './AdminDashboard.css';

// ── Icons ────────────────────────────────────────────────────────────────────
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

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
    <path d="M6 13l4-4 3 3 5-5"></path>
  </svg>
);

const PersonalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const HistorialIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="12" y1="18" x2="12" y2="12"></line>
    <line x1="9" y1="15" x2="15" y2="15"></line>
  </svg>
);

const CitasIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <circle cx="12" cy="15" r="2"></circle>
  </svg>
);

const PacientesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <line x1="19" y1="8" x2="19" y2="14"></line>
    <line x1="16" y1="11" x2="22" y2="11"></line>
  </svg>
);

const ClinicaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="10" y1="10" x2="14" y2="10"></line>
  </svg>
);

const DoctorAvatarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// SVG icon for the search magnifier
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// SVG icon for the lines/hamburger on the left of the search bar
const LinesIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// SVG icon for the filter button
const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// ── Reusable SearchBar ───────────────────────────────────────────────────────
const SearchBar = ({ value, onChange, placeholder = 'Buscar...', width = '280px' }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '8px',
    background: '#E8ECF0', borderRadius: '8px',
    padding: '0 14px', height: '40px',
    width, minWidth: '180px', boxSizing: 'border-box',
    border: '1.5px solid transparent',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }}
  onFocus={e => { e.currentTarget.style.borderColor = '#2D9CDB'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(45,156,219,0.12)'; }}
  onBlur={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
  tabIndex="-1"
  >
    <span style={{ color: '#7A8898', display: 'flex', alignItems: 'center' }}><LinesIcon /></span>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        flex: 1, border: 'none', background: 'transparent',
        outline: 'none', color: '#1B4F72', fontSize: '14px',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    />
    <span style={{ color: '#7A8898', display: 'flex', alignItems: 'center' }}><SearchIcon /></span>
  </div>
);

// ── Reusable FilterButton ────────────────────────────────────────────────────
const FilterBtn = ({ onClick, active = false }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '7px',
      height: '40px', padding: '0 16px',
      background: active ? '#EBF5FF' : '#FFFFFF',
      border: active ? '1.5px solid #2D9CDB' : '1.5px solid #D0D7E0',
      borderRadius: '8px', cursor: 'pointer',
      fontWeight: '600', fontSize: '13.5px', color: active ? '#1B4F72' : '#4F5B67',
      transition: 'all 0.18s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#2D9CDB'; e.currentTarget.style.color = '#1B4F72'; }}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#D0D7E0'; e.currentTarget.style.color = '#4F5B67'; }}}
  >
    <FilterIcon /> Filtrar
  </button>
);

// ── Constants ────────────────────────────────────────────────────────────────
const DIAS_SEMANA = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
const HORAS_DIA = [
  '08:00','09:00','10:00','11:00','12:00','13:00',
  '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'
];
const ESPECIALIDADES_LIST = [
  'Consulta general','Cardiologia','Neurologia','Pediatria','Odontologia','Dermatologia','Traumatologia'
];
const MEDICOS_LIST = [
  'Dr. Roberto Perez','Dr. Angel Gomes','Dr. Javier Choque','Dr. Maria Lopez','Dr. Carlos Mendez'
];

// ── Styles ────────────────────────────────────────────────────────────────────
const profileStyles = {
  container: {
    padding: '25px', background: '#EEF3F8', minHeight: '100%',
    fontFamily: "'Segoe UI', sans-serif", borderRadius: '12px'
  },
  title: { color: '#1B4F72', fontSize: '32px', fontWeight: '700', marginBottom: '25px' },
  card: {
    background: '#FFFFFF', padding: '22px', margin: '18px 0', borderRadius: '18px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderLeft: '6px solid #2D9CDB', transition: 'all 0.25s ease'
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '15px', borderBottom: '1px solid #EAECEF', paddingBottom: '10px'
  },
  nombre: { fontSize: '20px', fontWeight: '700', color: '#1B4F72' },
  badge: {
    background: 'linear-gradient(135deg, #27AE60, #219150)', color: '#fff',
    padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
    letterSpacing: '0.5px', boxShadow: '0 3px 8px rgba(39,174,96,0.25)'
  },
  info: { marginBottom: '18px', color: '#4F5B67', lineHeight: '1.6', fontSize: '15px' },
  button: {
    background: 'linear-gradient(135deg, #1B6CA8, #14507C)', color: '#fff', border: 'none',
    padding: '11px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600',
    fontSize: '14px', boxShadow: '0 4px 12px rgba(27,108,168,0.25)', transition: '0.25s ease'
  },
  historialBox: {
    marginTop: '35px', background: '#FFFFFF', padding: '25px',
    borderRadius: '18px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
  },
  historialCard: {
    background: '#F8FBFE', padding: '18px', marginTop: '18px', borderRadius: '14px',
    borderLeft: '5px solid #27AE60', boxShadow: '0 3px 10px rgba(0,0,0,0.05)', lineHeight: '1.7', color: '#34495E'
  }
};

// Shared input/select style for modals
const modalInputStyle = {
  width: '100%', padding: '9px 12px', border: '1px solid #D0D7E0',
  borderRadius: '6px', background: 'white', color: '#333',
  fontSize: '14px', outline: 'none', boxSizing: 'border-box'
};
const modalLabelStyle = {
  display: 'block', fontWeight: '700', fontSize: '15px', marginBottom: '6px', color: '#111'
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  // Core
  const [activeTab, setActiveTab] = useState('dashboards');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalMode, setModalMode] = useState('');
  const handleCloseModal = () => setModalMode('');

  // Profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: 'Dr. Armando Paredes', email: 'Armando@gmail.com',
    especialidad: 'Administración General', clinica: 'Nombre clínica central'
  });
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Calendar helpers
  const getMonthName = (date) => date.toLocaleString('default', { month: 'short' });
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const days = [];
    for (let i = firstDay - 1; i >= 0; i--)
      days.push(<div key={`prev-${i}`} className="calendar-day muted">{prevMonthDays - i}</div>);
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      days.push(<div key={`curr-${i}`} className={`calendar-day ${isToday ? 'active' : ''}`}>{i}</div>);
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++)
      days.push(<div key={`next-${i}`} className="calendar-day muted">{i}</div>);
    return days;
  };

  // ── Notifications State ─────────────────────────────────────────────────────
  const [showNotifications, setShowNotifications] = useState(false);
  const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'Nueva cita agendada: Ana Perez', time: 'Hace 5 min', isRead: false },
    { id: 2, title: 'Perfil actualizado: Dr. Armando', time: 'Hace 2 horas', isRead: true },
    { id: 3, title: 'Sistema iniciado correctamente', time: 'Hace 1 día', isRead: true }
  ];

  // ── Clinica State ───────────────────────────────────────────────────────────
  const [especialidadesData, setEspecialidadesData] = useState(ESPECIALIDADES_LIST);
  const [clinicaDataState, setClinicaDataState] = useState({
    nombre: 'Uroclinic',
    ciudad: 'La Paz',
    direccion: 'Av. Principal #123',
    telefono: '+582 78910112',
    correo: 'sv7067538@gmail.com'
  });
  const [newEspecialidad, setNewEspecialidad] = useState('');
  const handleAddEspecialidad = () => {
    if (newEspecialidad.trim()) {
      setEspecialidadesData([...especialidadesData, newEspecialidad.trim()]);
      setModalMode('');
      setNewEspecialidad('');
    }
  };

  // ── Personal State ──────────────────────────────────────────────────────────
  const [personalList, setPersonalList] = useState([]);
  const [searchTermPersonal, setSearchTermPersonal] = useState('');
  const [filterEspecialidadPersonal, setFilterEspecialidadPersonal] = useState('');
  const [formPersonal, setFormPersonal] = useState({ nombres: '', apellidos: '', especialidad: '', cargo: '', telefono: '' });
  const handleChangePersonal = (e) => setFormPersonal({ ...formPersonal, [e.target.name]: e.target.value });
  const [itemToDeletePersonal, setItemToDeletePersonal] = useState(null);
  const handleSavePersonal = () => {
    if (modalMode === 'editPersonal') {
      setPersonalList(personalList.map(p => p.id === formPersonal.id ? formPersonal : p));
    } else {
      setPersonalList([...personalList, { ...formPersonal, id: Date.now(), estado: 'Activo' }]);
    }
    setModalMode('');
    setFormPersonal({ nombres: '', apellidos: '', especialidad: '', cargo: '', telefono: '' });
  };
  const handleOpenViewPersonal = (personal) => {
    setFormPersonal(personal);
    setModalMode('viewPersonal');
  };
  const handleOpenEditPersonal = (personal) => {
    setFormPersonal(personal);
    setModalMode('editPersonal');
  };
  const handleOpenDeletePersonalConfirm = (id) => {
    setItemToDeletePersonal(id);
    setModalMode('deletePersonalConfirm');
  };
  const confirmDeletePersonal = () => {
    setPersonalList(personalList.filter(p => p.id !== itemToDeletePersonal));
    setModalMode('');
    setItemToDeletePersonal(null);
  };

  const filteredPersonal = personalList.filter(p => {
    const s = (p.nombres + ' ' + p.apellidos + ' ' + p.cargo).toLowerCase();
    return s.includes(searchTermPersonal.toLowerCase()) &&
      (filterEspecialidadPersonal ? p.especialidad === filterEspecialidadPersonal : true);
  });

  // ── Historial State ─────────────────────────────────────────────────────────
  const [historialList, setHistorialList] = useState([
    { id: 1, paciente: 'Juan Perez', medico: 'Dr. Lopez', fecha: { dd: '19', mm: '03', yyyy: '2026' }, diagnostico: 'Migraña', estado: 'Activo' }
  ]);
  const [searchTermHistorial, setSearchTermHistorial] = useState('');
  const [formHistorial, setFormHistorial] = useState({ id: null, paciente: '', medico: '', fecha: { dd: '', mm: '', yyyy: '' }, diagnostico: '', estado: 'Activo' });
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleChangeHistorial = (e) => setFormHistorial({ ...formHistorial, [e.target.name]: e.target.value });
  const handleDateChangeHistorial = (field, value) => setFormHistorial({ ...formHistorial, fecha: { ...formHistorial.fecha, [field]: value } });
  const handleOpenAddHistorial = () => { setFormHistorial({ id: null, paciente: '', medico: '', fecha: { dd: '', mm: '', yyyy: '' }, diagnostico: '', estado: 'Activo' }); setModalMode('addHistorial'); };
  const handleOpenViewHistorial = (item) => { setFormHistorial(item); setModalMode('viewHistorial'); };
  const handleOpenEditHistorial = (item) => { setFormHistorial(item); setModalMode('editHistorial'); };
  const handleOpenDeleteHistorialConfirm = (id) => { setItemToDelete(id); setModalMode('deleteHistorialConfirm'); };
  const handleSaveHistorial = () => {
    if (modalMode === 'editHistorial') {
      setHistorialList(historialList.map(h => h.id === formHistorial.id ? formHistorial : h));
    } else {
      setHistorialList([...historialList, { ...formHistorial, id: Date.now() }]);
    }
    setModalMode('');
  };
  const confirmDeleteHistorial = () => {
    setHistorialList(historialList.filter(h => h.id !== itemToDelete));
    setModalMode(''); setItemToDelete(null);
  };
  const filteredHistorial = historialList.filter(h =>
    h.paciente.toLowerCase().includes(searchTermHistorial.toLowerCase()) ||
    h.medico.toLowerCase().includes(searchTermHistorial.toLowerCase()) ||
    h.diagnostico.toLowerCase().includes(searchTermHistorial.toLowerCase())
  );

  // ── Citas State ─────────────────────────────────────────────────────────────
  const initFormCita = { id: null, paciente: '', especialidad: '', medico: '', dia: '', hora: '', fecha: { dd: '', mm: '', yyyy: '' }, estado: 'Pendiente' };
  const [citasList, setCitasList] = useState([
    { id: 1, paciente: 'Pedro Sanchez', medico: 'Dr. Roberto Perez', especialidad: 'Consulta general', dia: 'LUNES', hora: '08:00', fecha: { dd: '19', mm: '05', yyyy: '2026' }, estado: 'Confirmada' },
    { id: 2, paciente: 'Ana Perez', medico: 'Dr. Angel Gomes', especialidad: 'Cardiologia', dia: 'MIERCOLES', hora: '12:00', fecha: { dd: '21', mm: '05', yyyy: '2026' }, estado: 'Pendiente' },
    { id: 3, paciente: 'Esteban Graneros', medico: 'Dr. Angel Gomes', especialidad: 'Cardiologia', dia: 'JUEVES', hora: '10:00', fecha: { dd: '22', mm: '05', yyyy: '2026' }, estado: 'Atendida' },
    { id: 4, paciente: 'Nicolas Hernandez', medico: 'Dr. Javier Choque', especialidad: 'Odontologia', dia: 'LUNES', hora: '17:00', fecha: { dd: '19', mm: '05', yyyy: '2026' }, estado: 'Cancelada' },
  ]);
  const [searchTermCitas, setSearchTermCitas] = useState('');
  const [filterDiaCitas, setFilterDiaCitas] = useState('');
  const [filterEstadoCitas, setFilterEstadoCitas] = useState('');
  const [showFilterCitas, setShowFilterCitas] = useState(false);
  const [formCita, setFormCita] = useState(initFormCita);

  const handleChangeCita = (e) => setFormCita(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleDateChangeCita = (field, value) => setFormCita(prev => ({ ...prev, fecha: { ...prev.fecha, [field]: value } }));

  const handleOpenAddCita = () => { setFormCita(initFormCita); setModalMode('addCita'); };
  const handleOpenConfigCitaFromCard = (cita) => { setFormCita({ ...cita }); setModalMode('configurarCita'); };
  const handleOpenConfigCitaFromButton = () => { setFormCita(initFormCita); setModalMode('configurarCita'); };
  const handleSelectCitaForConfig = (citaId) => {
    if (!citaId) { setFormCita(initFormCita); return; }
    const found = citasList.find(c => c.id === Number(citaId));
    if (found) setFormCita({ ...found });
  };
  const handleSaveAddCita = () => {
    if (!formCita.paciente || !formCita.dia || !formCita.hora) return;
    setCitasList(prev => [...prev, { ...formCita, id: Date.now() }]);
    setModalMode('');
  };
  const handleSaveConfigCita = () => {
    if (!formCita.id) return;
    setCitasList(prev => prev.map(c => c.id === formCita.id ? formCita : c));
    setModalMode('');
  };

  const filteredCitas = citasList.filter(c => {
    const s = searchTermCitas.toLowerCase();
    return (!s || c.paciente.toLowerCase().includes(s) || c.medico.toLowerCase().includes(s) || c.especialidad.toLowerCase().includes(s))
      && (!filterDiaCitas || c.dia === filterDiaCitas)
      && (!filterEstadoCitas || c.estado === filterEstadoCitas);
  });
  const getCitasForCell = (dia, hora) => filteredCitas.filter(c => c.dia === dia && c.hora === hora);
  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'Pendiente': return '⚠️';
      case 'Cancelada': return '❌';
      case 'Atendida': return '✅';
      case 'Confirmada': return '📋';
      default: return '•';
    }
  };

  // ── Pacientes State ─────────────────────────────────────────────────────────
  const initFormPaciente = { id: null, nombres: '', apellidos: '', edad: '', telefono: '', email: '', medicoAsignado: '', estado: 'Activo' };
  const [pacientesList, setPacientesList] = useState([
    { id: 1, nombres: 'Pedro', apellidos: 'Sanchez', edad: 35, telefono: '555-1234', email: 'pedro@email.com', medicoAsignado: 'Dr. Roberto Perez', estado: 'Activo' },
    { id: 2, nombres: 'Ana', apellidos: 'Perez', edad: 28, telefono: '555-5678', email: 'ana@email.com', medicoAsignado: 'Dr. Angel Gomes', estado: 'Activo' },
    { id: 3, nombres: 'Esteban', apellidos: 'Graneros', edad: 45, telefono: '555-9012', email: 'esteban@email.com', medicoAsignado: 'Dr. Angel Gomes', estado: 'Activo' },
    { id: 4, nombres: 'Nicolas', apellidos: 'Hernandez', edad: 52, telefono: '555-3456', email: 'nicolas@email.com', medicoAsignado: 'Dr. Javier Choque', estado: 'Inactivo' },
  ]);
  const [searchTermPacientes, setSearchTermPacientes] = useState('');
  const [filterEstadoPacientes, setFilterEstadoPacientes] = useState('');
  const [filterMedicoPacientes, setFilterMedicoPacientes] = useState('');
  const [showFilterPacientes, setShowFilterPacientes] = useState(false);
  const [formPaciente, setFormPaciente] = useState(initFormPaciente);
  const [pacienteToDelete, setPacienteToDelete] = useState(null);

  const handleChangePaciente = (e) => setFormPaciente(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleOpenAddPaciente = () => { setFormPaciente(initFormPaciente); setModalMode('addPaciente'); };
  const handleOpenViewPaciente = (p) => { setFormPaciente({ ...p }); setModalMode('viewPaciente'); };
  const handleOpenEditPaciente = (p) => { setFormPaciente({ ...p }); setModalMode('editPaciente'); };
  const handleOpenDeletePaciente = (id) => { setPacienteToDelete(id); setModalMode('deletePacienteConfirm'); };
  const handleSavePaciente = () => {
    if (modalMode === 'editPaciente') {
      setPacientesList(prev => prev.map(p => p.id === formPaciente.id ? formPaciente : p));
    } else {
      setPacientesList(prev => [...prev, { ...formPaciente, id: Date.now() }]);
    }
    setModalMode('');
  };
  const confirmDeletePaciente = () => {
    setPacientesList(prev => prev.filter(p => p.id !== pacienteToDelete));
    setModalMode(''); setPacienteToDelete(null);
  };
  const filteredPacientes = pacientesList.filter(p => {
    const s = searchTermPacientes.toLowerCase();
    return (!s || (p.nombres + ' ' + p.apellidos).toLowerCase().includes(s) || p.email.toLowerCase().includes(s) || String(p.telefono).includes(s))
      && (!filterEstadoPacientes || p.estado === filterEstadoPacientes)
      && (!filterMedicoPacientes || p.medicoAsignado === filterMedicoPacientes);
  });

  // ── Shared modal container style ────────────────────────────────────────────
  const isCitaModal = ['addCita', 'configurarCita'].includes(modalMode);
  const isPacienteModal = ['addPaciente', 'viewPaciente', 'editPaciente', 'deletePacienteConfirm'].includes(modalMode);
  const modalContainerStyle = {
    background: '#F4F6F9', border: '4px solid #2D9CDB', borderRadius: '8px',
    padding: '2rem', maxWidth: isCitaModal ? '640px' : isPacienteModal ? '700px' : '600px',
    width: '90vw', position: 'relative', display: 'flex', flexDirection: 'column', gap: '0'
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div onClick={() => setActiveTab('dashboards')} className={`nav-item ${activeTab === 'dashboards' ? 'active' : ''}`}>
          <DashboardIcon /> Dashboards
        </div>
        <div onClick={() => setActiveTab('personal')} className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}>
          <PersonalIcon /> Gestion de personal
        </div>
        <div onClick={() => setActiveTab('historial')} className={`nav-item ${activeTab === 'historial' ? 'active' : ''}`}>
          <HistorialIcon /> Historial clinico
        </div>
        <div onClick={() => setActiveTab('citas')} className={`nav-item ${activeTab === 'citas' ? 'active' : ''}`}>
          <CitasIcon /> Gestion de citas
        </div>
        <div onClick={() => setActiveTab('pacientes')} className={`nav-item ${activeTab === 'pacientes' ? 'active' : ''}`}>
          <PacientesIcon /> Gestion de pacientes
        </div>
        <div onClick={() => setActiveTab('clinica')} className={`nav-item ${activeTab === 'clinica' ? 'active' : ''}`}>
          <ClinicaIcon /> Datos de la clinica
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-title">
            <LogoIcon />
            SISTEMA CLINICO
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div 
              style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '6px', color: '#1B4F72', fontWeight: '600', fontSize: '14px', cursor: 'pointer', padding: '8px', borderRadius: '8px', background: showNotifications ? '#EBF5FF' : 'transparent', transition: 'background 0.2s' }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <div style={{ position: 'relative' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {MOCK_NOTIFICATIONS.some(n => !n.isRead) && (
                  <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#E74C3C', borderRadius: '50%', border: '2px solid white' }}></div>
                )}
              </div>
              NOTIFICACIONES

              {showNotifications && (
                <div style={{ position: 'absolute', top: '100%', right: '0', marginTop: '10px', width: '300px', background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: '1px solid #EAECEF', zIndex: 100, overflow: 'hidden' }}>
                  <div style={{ padding: '15px 20px', borderBottom: '1px solid #EAECEF', background: '#F8F9FA', fontWeight: '700', color: '#1B4F72', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Notificaciones
                    <span style={{ fontSize: '11px', color: '#2D9CDB', cursor: 'pointer', fontWeight: '600' }}>Marcar leídas</span>
                  </div>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {MOCK_NOTIFICATIONS.map((notif, i) => (
                      <div key={notif.id} style={{ padding: '14px 20px', borderBottom: i < MOCK_NOTIFICATIONS.length - 1 ? '1px solid #EAECEF' : 'none', display: 'flex', gap: '12px', background: notif.isRead ? 'transparent' : '#F0F7FF', transition: 'background 0.2s' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: notif.isRead ? '#D0D7E0' : '#2D9CDB', marginTop: '5px' }}></div>
                        <div>
                          <div style={{ fontSize: '13.5px', color: '#111', fontWeight: notif.isRead ? '500' : '600', marginBottom: '4px' }}>{notif.title}</div>
                          <div style={{ fontSize: '12px', color: '#7A8898' }}>{notif.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid #EAECEF', background: '#F8F9FA', fontSize: '13px', color: '#2D9CDB', cursor: 'pointer', fontWeight: '600' }}>
                    Ver todas
                  </div>
                </div>
              )}
            </div>
            <div className="profile-icon"><UserIcon /></div>
          </div>
        </header>

        <div className="admin-content-wrapper">
          {/* ── DASHBOARDS TAB ── */}
          {activeTab === 'dashboards' ? (
            <>
              <div className="admin-main-panel fade-in delay-1">
                <div className="admin-welcome">Bienvenido administrador</div>
                <div className="admin-section-title">DASHBOARDS</div>
                <div className="admin-chart-container">
                  <img src="/bar_chart_mockup.png" alt="SAPS3 predicted mortality (%)" />
                </div>
                <div className="admin-stats-row">
                  <div className="admin-stat-card fade-in delay-2">
                    <div className="admin-stat-info">
                      <div className="admin-stat-value">{personalList.length || 23}</div>
                      <div className="admin-stat-label">Numero de Doctores</div>
                    </div>
                    <div className="admin-stat-icon-wrapper" style={{ background: '#38bdf8' }}>
                      <PersonalIcon />
                    </div>
                  </div>
                  <div className="admin-stat-card fade-in delay-3">
                    <div className="admin-stat-info">
                      <div className="admin-stat-value">{pacientesList.length}</div>
                      <div className="admin-stat-label">Numero de pacientes</div>
                    </div>
                    <div className="admin-stat-icon-wrapper" style={{ background: '#38bdf8' }}>
                      <PacientesIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-right-panel fade-in delay-2">
                <div className="admin-profile-card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('perfil')}>
                  <div className="admin-profile-avatar"><DoctorAvatarIcon /></div>
                  <div className="admin-profile-name">Dr. Armando Paredes</div>
                  <div className="admin-profile-details">Especialidad - Nombre clinica<br />Administrador</div>
                </div>
                <div className="admin-calendar-card fade-in delay-3">
                  <div className="admin-calendar-title">Mi calendario</div>
                  <div className="admin-calendar-mockup">
                    <div className="calendar-header">
                      <span onClick={prevMonth} style={{ cursor: 'pointer' }}>&lt;</span>
                      <span>{getMonthName(currentDate)} {currentDate.getFullYear()}</span>
                      <span onClick={nextMonth} style={{ cursor: 'pointer' }}>&gt;</span>
                    </div>
                    <div className="calendar-grid">
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="calendar-day-header">{d}</div>)}
                      {renderCalendarDays()}
                    </div>
                  </div>
                </div>
              </div>
            </>

          /* ── PERFIL TAB ── */
          ) : activeTab === 'perfil' ? (
            <div className="fade-in delay-1" style={{ ...profileStyles.container, gridColumn: '1 / span 2' }}>
              <h1 style={profileStyles.title}>Cuenta</h1>
              <div style={{ ...profileStyles.card, display: 'flex', alignItems: 'center', gap: '30px', borderLeft: 'none', background: '#F8F9FA' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#ff6b6b', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  <DoctorAvatarIcon />
                </div>
                <div>
                  {isEditingProfile ? (
                    <input type="text" name="nombre" value={profileData.nombre} onChange={handleProfileChange}
                      style={{ fontSize: '24px', fontWeight: '400', color: '#000', marginBottom: '10px', width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  ) : (
                    <div style={{ fontSize: '32px', fontWeight: '400', color: '#000', marginBottom: '15px' }}>{profileData.nombre}</div>
                  )}
                  {isEditingProfile ? (
                    <input type="text" name="email" value={profileData.email} onChange={handleProfileChange}
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontWeight: '500', fontSize: '16px' }} />
                  ) : (
                    <div style={{ background: '#EAECEF', padding: '12px 20px', borderRadius: '4px', display: 'inline-block', color: '#000', fontWeight: '500', fontSize: '16px' }}>
                      {profileData.email}
                    </div>
                  )}
                </div>
              </div>
              <div style={profileStyles.card}>
                <div style={profileStyles.header}>
                  <div style={profileStyles.nombre}>Información Adicional</div>
                  <span style={profileStyles.badge}>Activo</span>
                </div>
                <div style={profileStyles.info}><strong>Especialidad: </strong>
                  {isEditingProfile ? <input type="text" name="especialidad" value={profileData.especialidad} onChange={handleProfileChange} style={{ padding: '5px', marginLeft: '10px', borderRadius: '4px', border: '1px solid #ccc' }} /> : profileData.especialidad}
                </div>
                <div style={profileStyles.info}><strong>Clínica: </strong>
                  {isEditingProfile ? <input type="text" name="clinica" value={profileData.clinica} onChange={handleProfileChange} style={{ padding: '5px', marginLeft: '10px', borderRadius: '4px', border: '1px solid #ccc' }} /> : profileData.clinica}
                </div>
                <button style={profileStyles.button} onClick={() => setIsEditingProfile(!isEditingProfile)}>
                  {isEditingProfile ? 'Guardar Datos' : 'Actualizar Datos'}
                </button>
              </div>
            </div>

          /* ── PERSONAL TAB ── */
          ) : activeTab === 'personal' ? (
            <div className="admin-main-panel fade-in delay-1" style={{ gridColumn: '1 / span 2' }}>
              <h1 className="page-title" style={{ textTransform: 'capitalize', color: 'var(--primary-color)' }}>Gestion de personal</h1>
              <div className="admin-stats-row" style={{ marginBottom: '20px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Numero de medicos:', value: 12, icon: <DoctorAvatarIcon /> },
                  { label: 'Numero de enfermeros:', value: 7, icon: <PersonalIcon /> },
                  { label: 'Personal:', value: 15, icon: <div style={{ width: '40px', height: '40px', background: '#27AE60', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✓</div> },
                  { label: 'Personal inactivo:', value: 4, icon: <div style={{ width: '40px', height: '40px', background: '#E74C3C', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✕</div> },
                ].map((s, i) => (
                  <div key={i} style={{ ...profileStyles.card, flex: '1', minWidth: '200px', margin: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: 'none', background: '#F4F6F9' }}>
                    <div>
                      <div style={{ fontSize: '14px', color: '#4F5B67', marginBottom: '5px' }}>{s.label}</div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B4F72' }}>{s.value}</div>
                    </div>
                    {s.icon}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '12px', flex: 1, alignItems: 'center' }}>
                  <SearchBar value={searchTermPersonal} onChange={e => setSearchTermPersonal(e.target.value)} width="280px" />
                  <select style={{ height: '40px', background: '#FFFFFF', border: '1.5px solid #D0D7E0', padding: '0 14px', borderRadius: '8px', cursor: 'pointer', outline: 'none', fontSize: '13.5px', color: '#4F5B67', fontWeight: '500' }}
                    value={filterEspecialidadPersonal} onChange={e => setFilterEspecialidadPersonal(e.target.value)}>
                    <option value="">Filtrar Especialidad</option>
                    {especialidadesData.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <button style={profileStyles.button} onClick={() => setModalMode('addPersonal')}>+ Agregar personal</button>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 0.8fr 1.5fr', padding: '15px 20px', background: '#F8F9FA', borderBottom: '1px solid #EAECEF', fontWeight: '600', color: '#4F5B67', fontSize: '14px' }}>
                  <div>Nombre</div><div>Cargo</div><div>Especialidad</div><div>Telefono</div><div>Estado</div><div>Acciones</div>
                </div>
                {filteredPersonal.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>Los miembros del personal apareceran aqui</div>
                ) : filteredPersonal.map((p, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 0.8fr 1.5fr', padding: '15px 20px', borderBottom: '1px solid #EAECEF', alignItems: 'center', fontSize: '14px' }}>
                    <div>{p.nombres} {p.apellidos}</div><div>{p.cargo}</div><div>{p.especialidad}</div><div>{p.telefono}</div>
                    <div><span style={{ background: p.estado === 'Activo' ? '#D4EDDA' : '#F8D7DA', color: p.estado === 'Activo' ? '#155724' : '#721C24', padding: '4px 8px', borderRadius: '4px' }}>{p.estado}</span></div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button style={{ background: '#00bcd4', color: 'white', border: 'none', padding: '5px 9px', borderRadius: '14px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '600' }} onClick={() => handleOpenViewPersonal(p)}>Ver</button>
                      <button style={{ background: '#4caf50', color: 'white', border: 'none', padding: '5px 9px', borderRadius: '14px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '600' }} onClick={() => handleOpenEditPersonal(p)}>Editar</button>
                      <button style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 9px', borderRadius: '14px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '600' }} onClick={() => handleOpenDeletePersonalConfirm(p.id)}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          /* ── HISTORIAL TAB ── */
          ) : activeTab === 'historial' ? (
            <div className="admin-main-panel fade-in delay-1" style={{ gridColumn: '1 / span 2' }}>
              <h1 className="page-title" style={{ textTransform: 'capitalize', color: 'var(--primary-color)' }}>Historial clinico</h1>
              <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <SearchBar value={searchTermHistorial} onChange={e => setSearchTermHistorial(e.target.value)} width="280px" />
                <FilterBtn />
                <button style={profileStyles.button} onClick={handleOpenAddHistorial}>+ Agregar Historial</button>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1.5fr', padding: '15px 20px', background: '#F8F9FA', borderBottom: '1px solid #EAECEF', fontWeight: '600', color: '#4F5B67', fontSize: '14px' }}>
                  <div>Paciente</div><div>Medico</div><div>Fecha</div><div>Diagnostico</div><div>Estado</div><div>Acciones</div>
                </div>
                {filteredHistorial.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>Los historiales apareceran aqui</div>
                ) : filteredHistorial.map((h, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1.5fr', padding: '15px 20px', borderBottom: '1px solid #EAECEF', alignItems: 'center', fontSize: '14px' }}>
                    <div>{h.paciente}</div><div>{h.medico}</div><div>{h.fecha.dd}/{h.fecha.mm}/{h.fecha.yyyy}</div>
                    <div>{h.diagnostico}</div><div>{h.estado}</div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button style={{ background: '#00bcd4', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px' }} onClick={() => handleOpenViewHistorial(h)}>Ver</button>
                      <button style={{ background: '#4caf50', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px' }} onClick={() => handleOpenEditHistorial(h)}>Editar</button>
                      <button style={{ background: '#f44336', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px' }} onClick={() => handleOpenDeleteHistorialConfirm(h.id)}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          /* ── CITAS TAB ── */
          ) : activeTab === 'citas' ? (
            <div className="admin-main-panel fade-in delay-1" style={{ gridColumn: '1 / span 2' }}>
              <h1 className="page-title" style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Gestion de citas</h1>

              {/* Toolbar */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
                {/* Search */}
                <SearchBar
                  value={searchTermCitas}
                  onChange={e => setSearchTermCitas(e.target.value)}
                  placeholder="Buscar paciente, médico..."
                  width="270px"
                />

                {/* Filter */}
                <div style={{ position: 'relative' }}>
                  <FilterBtn onClick={() => setShowFilterCitas(!showFilterCitas)} active={showFilterCitas || !!filterDiaCitas || !!filterEstadoCitas} />
                  {showFilterCitas && (
                    <div style={{ position: 'absolute', top: '46px', left: 0, background: 'white', border: '1px solid #EAECEF', borderRadius: '10px', padding: '16px', zIndex: 99, width: '230px', boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}>
                      <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#4F5B67', marginBottom: '5px', textTransform: 'uppercase' }}>Día</label>
                        <select style={{ ...modalInputStyle, fontSize: '13px' }} value={filterDiaCitas} onChange={e => setFilterDiaCitas(e.target.value)}>
                          <option value="">Todos los días</option>
                          {DIAS_SEMANA.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#4F5B67', marginBottom: '5px', textTransform: 'uppercase' }}>Estado</label>
                        <select style={{ ...modalInputStyle, fontSize: '13px' }} value={filterEstadoCitas} onChange={e => setFilterEstadoCitas(e.target.value)}>
                          <option value="">Todos</option>
                          <option value="Pendiente">⚠️ Pendiente</option>
                          <option value="Confirmada">📋 Confirmada</option>
                          <option value="Atendida">✅ Atendida</option>
                          <option value="Cancelada">❌ Cancelada</option>
                        </select>
                      </div>
                      <button style={{ ...profileStyles.button, width: '100%', fontSize: '13px', padding: '8px' }}
                        onClick={() => { setFilterDiaCitas(''); setFilterEstadoCitas(''); setShowFilterCitas(false); }}>
                        Limpiar filtros
                      </button>
                    </div>
                  )}
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', fontSize: '12px', color: '#4F5B67' }}>
                  <span style={{ fontWeight: '600' }}>Citas</span>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <span>⚠️ Pendientes</span>
                    <span>❌ Canceladas</span>
                    <span>✅ Atendidas</span>
                    <span>📋 Confirmadas</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button style={{ ...profileStyles.button, display: 'flex', alignItems: 'center', gap: '5px', padding: '9px 16px' }} onClick={handleOpenAddCita}>
                    + Agregar Citas
                  </button>
                  <button style={{ ...profileStyles.button, background: 'linear-gradient(135deg, #2D9CDB, #1A7DB5)', padding: '9px 16px' }} onClick={handleOpenConfigCitaFromButton}>
                    Configurar Citas
                  </button>
                </div>
              </div>

              {/* Weekly Calendar */}
              <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ overflowY: 'auto', maxHeight: '520px' }}>
                    <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '720px' }}>
                      <thead>
                        <tr style={{ background: '#1B4F72', color: 'white', position: 'sticky', top: 0, zIndex: 5 }}>
                          <th style={{ padding: '13px 12px', width: '72px', fontWeight: '600', fontSize: '13px' }}></th>
                          {DIAS_SEMANA.map(dia => (
                            <th key={dia} style={{ padding: '13px 8px', textAlign: 'center', fontWeight: '800', fontSize: '12px', letterSpacing: '1.2px' }}>{dia}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {HORAS_DIA.map((hora, hIndex) => (
                          <tr key={hora} style={{ background: hIndex % 2 === 0 ? '#F7FBFF' : '#FFFFFF' }}>
                            <td style={{ padding: '6px 10px', color: '#4F5B67', fontSize: '12px', fontWeight: '600', borderRight: '2px solid #DDE6EF', textAlign: 'right', whiteSpace: 'nowrap', verticalAlign: 'top', paddingTop: '8px' }}>
                              {hora}
                            </td>
                            {DIAS_SEMANA.map(dia => {
                              const citas = getCitasForCell(dia, hora);
                              return (
                                <td key={dia} style={{ padding: '4px 5px', borderBottom: '1px solid #EBF0F5', verticalAlign: 'top', minWidth: '118px', height: '50px' }}>
                                  {citas.map(cita => (
                                    <div
                                      key={cita.id}
                                      onClick={() => handleOpenConfigCitaFromCard(cita)}
                                      title={`${cita.paciente} - ${cita.estado}`}
                                      style={{
                                        background: 'linear-gradient(135deg, #27AE60, #1E8449)',
                                        color: 'white', padding: '5px 8px', borderRadius: '6px',
                                        fontSize: '11px', marginBottom: '3px', cursor: 'pointer',
                                        boxShadow: '0 2px 6px rgba(39,174,96,0.3)',
                                        transition: 'transform 0.15s, box-shadow 0.15s',
                                      }}
                                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(39,174,96,0.45)'; }}
                                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(39,174,96,0.3)'; }}
                                    >
                                      <div style={{ fontWeight: '700', fontSize: '11.5px', marginBottom: '1px' }}>{cita.paciente}</div>
                                      <div style={{ fontSize: '10.5px', opacity: 0.92 }}>{cita.medico}</div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                                        <span style={{ fontSize: '10px' }}>• {cita.especialidad}</span>
                                        <span style={{ fontSize: '12px' }}>{getStatusIcon(cita.estado)}</span>
                                      </div>
                                    </div>
                                  ))}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          /* ── PACIENTES TAB ── */
          ) : activeTab === 'pacientes' ? (
            <div className="admin-main-panel fade-in delay-1" style={{ gridColumn: '1 / span 2' }}>
              <h1 className="page-title" style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Gestion de pacientes</h1>

              {/* Stats row */}
              <div className="admin-stats-row" style={{ marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                {[
                  { label: 'Total pacientes', value: pacientesList.length, color: '#1B4F72', icon: <PacientesIcon />, bg: '#EBF5FF' },
                  { label: 'Activos', value: pacientesList.filter(p => p.estado === 'Activo').length, color: '#27AE60', icon: '✓', iconBg: '#27AE60' },
                  { label: 'Inactivos', value: pacientesList.filter(p => p.estado === 'Inactivo').length, color: '#E74C3C', icon: '✕', iconBg: '#E74C3C' },
                  { label: 'Con citas esta semana', value: citasList.filter(c => pacientesList.some(p => (p.nombres + ' ' + p.apellidos) === c.paciente)).length, color: '#2D9CDB', icon: <CitasIcon />, bg: '#E8F4FD' },
                ].map((s, i) => (
                  <div key={i} style={{ ...profileStyles.card, flex: '1', minWidth: '160px', margin: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: 'none', background: '#F4F6F9', padding: '16px 18px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#4F5B67', marginBottom: '4px' }}>{s.label}</div>
                      <div style={{ fontSize: '26px', fontWeight: '700', color: s.color }}>{s.value}</div>
                    </div>
                    {typeof s.icon === 'string' ? (
                      <div style={{ width: '38px', height: '38px', background: s.iconBg, borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '700', fontSize: '16px' }}>{s.icon}</div>
                    ) : (
                      <div style={{ color: s.color, opacity: 0.7 }}>{s.icon}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Toolbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <SearchBar
                    value={searchTermPacientes}
                    onChange={e => setSearchTermPacientes(e.target.value)}
                    placeholder="Buscar por nombre, email o teléfono..."
                    width="300px"
                  />
                  <div style={{ position: 'relative' }}>
                    <FilterBtn onClick={() => setShowFilterPacientes(!showFilterPacientes)} active={showFilterPacientes || !!filterEstadoPacientes || !!filterMedicoPacientes} />
                    {showFilterPacientes && (
                      <div style={{ position: 'absolute', top: '46px', left: 0, background: 'white', border: '1px solid #EAECEF', borderRadius: '10px', padding: '16px', zIndex: 99, width: '230px', boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#4F5B67', marginBottom: '5px', textTransform: 'uppercase' }}>Estado</label>
                          <select style={{ ...modalInputStyle, fontSize: '13px' }} value={filterEstadoPacientes} onChange={e => setFilterEstadoPacientes(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                          </select>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#4F5B67', marginBottom: '5px', textTransform: 'uppercase' }}>Médico</label>
                          <select style={{ ...modalInputStyle, fontSize: '13px' }} value={filterMedicoPacientes} onChange={e => setFilterMedicoPacientes(e.target.value)}>
                            <option value="">Todos los médicos</option>
                            {MEDICOS_LIST.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <button style={{ ...profileStyles.button, width: '100%', fontSize: '13px', padding: '8px' }}
                          onClick={() => { setFilterEstadoPacientes(''); setFilterMedicoPacientes(''); setShowFilterPacientes(false); }}>
                          Limpiar filtros
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <button style={profileStyles.button} onClick={handleOpenAddPaciente}>+ Agregar Paciente</button>
              </div>

              {/* Table */}
              <div style={{ background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.6fr 1fr 1.6fr 1.6fr 0.9fr 1.5fr', padding: '14px 18px', background: '#F8F9FA', borderBottom: '2px solid #EAECEF', fontWeight: '700', color: '#4F5B67', fontSize: '13px', gap: '8px' }}>
                  <div>Nombre</div><div>Edad</div><div>Teléfono</div><div>Email</div><div>Médico Asignado</div><div>Estado</div><div>Acciones</div>
                </div>
                {filteredPacientes.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
                    No se encontraron pacientes
                  </div>
                ) : filteredPacientes.map(p => (
                  <div
                    key={p.id}
                    style={{ display: 'grid', gridTemplateColumns: '2fr 0.6fr 1fr 1.6fr 1.6fr 0.9fr 1.5fr', padding: '13px 18px', borderBottom: '1px solid #EAECEF', alignItems: 'center', fontSize: '13.5px', gap: '8px', transition: 'background 0.2s', cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F0F7FF'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}
                  >
                    <div style={{ fontWeight: '600', color: '#1B4F72' }}>{p.nombres} {p.apellidos}</div>
                    <div style={{ color: '#4F5B67' }}>{p.edad}</div>
                    <div style={{ color: '#4F5B67' }}>{p.telefono}</div>
                    <div style={{ color: '#4F5B67', fontSize: '12.5px' }}>{p.email}</div>
                    <div style={{ color: '#4F5B67', fontSize: '12.5px' }}>{p.medicoAsignado}</div>
                    <div>
                      <span style={{ background: p.estado === 'Activo' ? '#D4EDDA' : '#F8D7DA', color: p.estado === 'Activo' ? '#155724' : '#721C24', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                        {p.estado}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button style={{ background: '#00bcd4', color: 'white', border: 'none', padding: '5px 9px', borderRadius: '14px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '600' }} onClick={() => handleOpenViewPaciente(p)}>Ver</button>
                      <button style={{ background: '#4caf50', color: 'white', border: 'none', padding: '5px 9px', borderRadius: '14px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '600' }} onClick={() => handleOpenEditPaciente(p)}>Editar</button>
                      <button style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 9px', borderRadius: '14px', cursor: 'pointer', fontSize: '11.5px', fontWeight: '600' }} onClick={() => handleOpenDeletePaciente(p.id)}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          /* ── CLINICA TAB ── */
          ) : activeTab === 'clinica' ? (
            <div className="admin-main-panel fade-in delay-1" style={{ gridColumn: '1 / span 2', display: 'flex', gap: '50px' }}>
              <div style={{ flex: 1, padding: '20px 40px' }}>
                <h1 className="page-title" style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Datos de la clinica</h1>
                
                <div style={{ background: '#F4F6F9', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                  <div style={{ fontSize: '16px', color: '#333', lineHeight: '1.8' }}>
                    <div><strong>Clinica:</strong> {clinicaDataState.nombre}</div>
                    <div><strong>Ciudad:</strong> {clinicaDataState.ciudad}</div>
                    <div><strong>Direccion:</strong> {clinicaDataState.direccion}</div>
                    <div><strong>Telefono:</strong> {clinicaDataState.telefono}</div>
                    <div><strong>Correo:</strong> {clinicaDataState.correo}</div>
                  </div>
                </div>

                <h1 className="page-title" style={{ color: 'var(--primary-color)', marginBottom: '15px', fontSize: '20px' }}>Especialidades manejadas</h1>
                
                <div style={{ background: '#F4F6F9', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '16px', color: '#333', lineHeight: '1.8' }}>
                    {especialidadesData.slice(0, 10).map((esp, i) => (
                      <div key={i}>{esp}</div>
                    ))}
                    {especialidadesData.length > 10 && <div>... y {especialidadesData.length - 10} más</div>}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button style={{ ...profileStyles.button, display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setModalMode('addEspecialidad')}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Agregar especialidad
                  </button>
                </div>
              </div>

            </div>

          /* ── FALLBACK TAB ── */
          ) : (
            <div className="admin-main-panel fade-in delay-1" style={{ gridColumn: '1 / span 2' }}>
              <h1 className="page-title" style={{ textTransform: 'capitalize' }}>{activeTab.replace('-', ' ')}</h1>
              <div className="admin-chart-container" style={{ padding: '3rem', color: 'var(--text-light)' }}>
                El contenido de este módulo se implementará próximamente.
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ══ MODALS ══════════════════════════════════════════════════════════ */}
      {modalMode && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) handleCloseModal(); }}>
          <div style={modalContainerStyle} className="fade-in">
            {/* Close button */}
            <button onClick={handleCloseModal}
              style={{ position: 'absolute', top: '14px', right: '16px', background: 'transparent', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#666', lineHeight: 1 }}>
              ✕
            </button>

            {/* ── ADD / EDIT PERSONAL MODAL ── */}
            {(modalMode === 'addPersonal' || modalMode === 'editPersonal') && (
              <div style={{ display: 'flex', gap: '28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '110px' }}>
                  <h2 style={{ fontSize: '16px', color: '#000', marginBottom: '16px', textAlign: 'center' }}>
                    {modalMode === 'addPersonal' ? 'Agregar personal' : 'Editar personal'}
                  </h2>
                  <div style={{ width: '75px', height: '75px', color: '#1B4F72' }}><DoctorAvatarIcon /></div>
                </div>
                <div style={{ flex: 1 }}>
                  {[{ name: 'nombres', label: 'Nombres', ph: 'Ingrese el nombre' }, { name: 'apellidos', label: 'Apellidos', ph: 'Ingrese los apellidos' }].map(f => (
                    <div key={f.name} style={{ marginBottom: '14px' }}>
                      <label style={modalLabelStyle}>{f.label}</label>
                      <input type="text" name={f.name} placeholder={f.ph} value={formPersonal[f.name]} onChange={handleChangePersonal}
                        style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Especialidad</label>
                      <select name="especialidad" value={formPersonal.especialidad} onChange={handleChangePersonal} style={{ ...modalInputStyle }}>
                        <option value="">Seleccione la especialidad</option>
                        {ESPECIALIDADES_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Cargo</label>
                      <select name="cargo" value={formPersonal.cargo} onChange={handleChangePersonal} style={{ ...modalInputStyle }}>
                        <option value="">Seleccione el cargo</option>
                        <option value="Medico">Médico</option>
                        <option value="Enfermero">Enfermero</option>
                        <option value="Administrativo">Administrativo</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={modalLabelStyle}>Telefono</label>
                    <input type="text" name="telefono" placeholder="Número de teléfono" value={formPersonal.telefono} onChange={handleChangePersonal}
                      style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleSavePersonal} style={profileStyles.button}>
                      {modalMode === 'addPersonal' ? 'Agregar personal' : 'Guardar cambios'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── VIEW PERSONAL MODAL ── */}
            {modalMode === 'viewPersonal' && (
              <div style={{ display: 'flex', gap: '28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '110px' }}>
                  <h2 style={{ fontSize: '16px', color: '#000', marginBottom: '16px', textAlign: 'center' }}>Ver personal</h2>
                  <div style={{ width: '75px', height: '75px', color: '#1B4F72' }}><DoctorAvatarIcon /></div>
                </div>
                <div style={{ flex: 1 }}>
                  {[{ name: 'nombres', label: 'Nombres', ph: 'Ingrese el nombre' }, { name: 'apellidos', label: 'Apellidos', ph: 'Ingrese los apellidos' }].map(f => (
                    <div key={f.name} style={{ marginBottom: '14px' }}>
                      <label style={modalLabelStyle}>{f.label}</label>
                      <input type="text" name={f.name} placeholder={f.ph} value={formPersonal[f.name]} readOnly
                        style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Especialidad</label>
                      <input type="text" value={formPersonal.especialidad} readOnly style={{ ...modalInputStyle, background: 'transparent', border: 'none', borderBottom: '1px solid #ddd' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Cargo</label>
                      <input type="text" value={formPersonal.cargo} readOnly style={{ ...modalInputStyle, background: 'transparent', border: 'none', borderBottom: '1px solid #ddd' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={modalLabelStyle}>Telefono</label>
                    <input type="text" name="telefono" placeholder="Número de teléfono" value={formPersonal.telefono} readOnly
                      style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleCloseModal} style={profileStyles.button}>Cerrar</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── DELETE PERSONAL CONFIRM ── */}
            {modalMode === 'deletePersonalConfirm' && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ width: '60px', height: '60px', background: '#FDECEA', color: '#E74C3C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 15px' }}>
                  !
                </div>
                <h2 style={{ fontSize: '20px', color: '#111', marginBottom: '10px' }}>¿Eliminar miembro del personal?</h2>
                <p style={{ color: '#555', marginBottom: '25px', fontSize: '15px' }}>Esta acción no se puede deshacer y el miembro será removido del sistema permanentemente.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <button onClick={handleCloseModal} style={{ background: 'transparent', border: '1px solid #D0D7E0', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#4F5B67' }}>Cancelar</button>
                  <button onClick={confirmDeletePersonal} style={{ background: '#E74C3C', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: 'white' }}>Sí, Eliminar</button>
                </div>
              </div>
            )}

            {/* ── HISTORIAL MODALS ── */}
            {(modalMode === 'addHistorial' || modalMode === 'viewHistorial' || modalMode === 'editHistorial') && (
              <div style={{ display: 'flex', gap: '28px' }}>
                {modalMode === 'addHistorial' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '110px' }}>
                    <h2 style={{ fontSize: '16px', color: '#000', marginBottom: '16px', textAlign: 'center' }}>Agregar historial</h2>
                    <div style={{ width: '75px', height: '75px', color: '#1B4F72' }}><UserIcon /></div>
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  {modalMode !== 'addHistorial' && (
                    <h2 style={{ fontSize: '22px', color: '#000', marginBottom: '18px' }}>
                      {modalMode === 'editHistorial' ? 'Editar datos' : 'Ver datos'}
                    </h2>
                  )}
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: '14px' }}>
                        <label style={modalLabelStyle}>Paciente</label>
                        <input type="text" name="paciente" placeholder="Nombre completo del paciente" value={formHistorial.paciente} onChange={handleChangeHistorial} readOnly={modalMode === 'viewHistorial'}
                          style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ marginBottom: '14px' }}>
                        <label style={modalLabelStyle}>Medico</label>
                        <input type="text" name="medico" placeholder="Nombre del médico" value={formHistorial.medico} onChange={handleChangeHistorial} readOnly={modalMode === 'viewHistorial'}
                          style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: '14px' }}>
                        <label style={modalLabelStyle}>Fecha</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {[['dd', 'DD', '48px'], ['mm', 'MM', '48px'], ['yyyy', 'YYYY', '64px']].map(([f, ph, w]) => (
                            <input key={f} type="text" placeholder={ph} value={formHistorial.fecha[f]} onChange={e => handleDateChangeHistorial(f, e.target.value)} readOnly={modalMode === 'viewHistorial'}
                              style={{ width: w, background: 'white', border: '1px solid #ddd', padding: '7px 4px', borderRadius: '4px', textAlign: 'center' }} />
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom: '14px' }}>
                        <label style={modalLabelStyle}>Diagnostico</label>
                        <input type="text" name="diagnostico" placeholder="Diagnóstico del paciente" value={formHistorial.diagnostico} onChange={handleChangeHistorial} readOnly={modalMode === 'viewHistorial'}
                          style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px', gap: '10px' }}>
                    {modalMode === 'addHistorial' && <button onClick={handleSaveHistorial} style={profileStyles.button}>Agregar Historial</button>}
                    {modalMode === 'viewHistorial' && <button onClick={handleCloseModal} style={profileStyles.button}>Cerrar</button>}
                    {modalMode === 'editHistorial' && (<>
                      <button onClick={handleCloseModal} style={profileStyles.button}>Cancelar</button>
                      <button onClick={handleSaveHistorial} style={{ ...profileStyles.button, background: '#27AE60' }}>Cambiar</button>
                    </>)}
                  </div>
                </div>
              </div>
            )}

            {modalMode === 'deleteHistorialConfirm' && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Eliminar registro</h2>
                <p style={{ fontSize: '16px', marginBottom: '28px', fontWeight: '500', color: '#4F5B67' }}>¿Está seguro de que quiere<br />eliminar este registro?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <button onClick={handleCloseModal} style={profileStyles.button}>Cancelar</button>
                  <button onClick={confirmDeleteHistorial} style={{ ...profileStyles.button, background: '#E74C3C' }}>Eliminar</button>
                </div>
              </div>
            )}

            {/* ── AGREGAR CITA MODAL ── */}
            {modalMode === 'addCita' && (
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: '#111' }}>Agregar cita</h2>

                <div style={{ marginBottom: '14px' }}>
                  <label style={modalLabelStyle}>Paciente</label>
                  <select name="paciente" value={formCita.paciente} onChange={handleChangeCita} style={modalInputStyle}>
                    <option value="">Seleccione un paciente registrado</option>
                    {pacientesList.map(p => <option key={p.id} value={`${p.nombres} ${p.apellidos}`}>{p.nombres} {p.apellidos}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={modalLabelStyle}>Especialidad</label>
                  <select name="especialidad" value={formCita.especialidad} onChange={handleChangeCita} style={modalInputStyle}>
                    <option value="">Seleccione la especialidad</option>
                    {ESPECIALIDADES_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={modalLabelStyle}>Medico</label>
                  <select name="medico" value={formCita.medico} onChange={handleChangeCita} style={modalInputStyle}>
                    <option value="">Seleccione el medico</option>
                    {MEDICOS_LIST.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div>
                    <label style={modalLabelStyle}>Fecha</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[['dd', 'DD', '52px'], ['mm', 'MM', '52px'], ['yyyy', 'YYYY', '66px']].map(([f, ph, w]) => (
                        <input key={f} type="text" placeholder={ph} maxLength={f === 'yyyy' ? 4 : 2} value={formCita.fecha[f]} onChange={e => handleDateChangeCita(f, e.target.value)}
                          style={{ width: w, padding: '9px 6px', border: '1px solid #D0D7E0', borderRadius: '6px', textAlign: 'center', background: 'white', fontSize: '14px' }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: '140px' }}>
                    <label style={modalLabelStyle}>Hora</label>
                    <select name="hora" value={formCita.hora} onChange={handleChangeCita} style={modalInputStyle}>
                      <option value="">Seleccione la hora</option>
                      {HORAS_DIA.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1, minWidth: '140px' }}>
                    <label style={modalLabelStyle}>Día de la semana</label>
                    <select name="dia" value={formCita.dia} onChange={handleChangeCita} style={modalInputStyle}>
                      <option value="">Seleccione el día</option>
                      {DIAS_SEMANA.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button
                    onClick={handleSaveAddCita}
                    disabled={!formCita.paciente || !formCita.dia || !formCita.hora}
                    style={{ ...profileStyles.button, opacity: (!formCita.paciente || !formCita.dia || !formCita.hora) ? 0.5 : 1 }}>
                    Agregar Cita
                  </button>
                </div>
              </div>
            )}

            {/* ── CONFIGURAR CITA MODAL ── */}
            {modalMode === 'configurarCita' && (
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: '#111' }}>Configurar cita</h2>

                <div style={{ marginBottom: '14px' }}>
                  <label style={modalLabelStyle}>Seleccionar Cita</label>
                  <select
                    value={formCita.id || ''}
                    onChange={e => handleSelectCitaForConfig(e.target.value)}
                    style={{ ...modalInputStyle, background: '#F0F4F8', fontWeight: formCita.id ? '600' : '400' }}>
                    <option value="">— Seleccione una cita existente —</option>
                    {citasList.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.paciente} | {c.dia} {c.hora} | {c.especialidad} ({c.estado})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={modalLabelStyle}>Paciente</label>
                  <select name="paciente" value={formCita.paciente} onChange={handleChangeCita} style={modalInputStyle}>
                    <option value="">Seleccione un paciente registrado</option>
                    {pacientesList.map(p => <option key={p.id} value={`${p.nombres} ${p.apellidos}`}>{p.nombres} {p.apellidos}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={modalLabelStyle}>Especialidad</label>
                  <select name="especialidad" value={formCita.especialidad} onChange={handleChangeCita} style={modalInputStyle}>
                    <option value="">Seleccione la especialidad</option>
                    {ESPECIALIDADES_LIST.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={modalLabelStyle}>Medico</label>
                  <select name="medico" value={formCita.medico} onChange={handleChangeCita} style={modalInputStyle}>
                    <option value="">Seleccione el medico</option>
                    {MEDICOS_LIST.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div>
                    <label style={modalLabelStyle}>Fecha</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[['dd', 'DD', '52px'], ['mm', 'MM', '52px'], ['yyyy', 'YYYY', '66px']].map(([f, ph, w]) => (
                        <input key={f} type="text" placeholder={ph} maxLength={f === 'yyyy' ? 4 : 2} value={formCita.fecha?.[f] || ''} onChange={e => handleDateChangeCita(f, e.target.value)}
                          style={{ width: w, padding: '9px 6px', border: '1px solid #D0D7E0', borderRadius: '6px', textAlign: 'center', background: 'white', fontSize: '14px' }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: '130px' }}>
                    <label style={modalLabelStyle}>Hora</label>
                    <select name="hora" value={formCita.hora} onChange={handleChangeCita} style={modalInputStyle}>
                      <option value="">Seleccione la hora</option>
                      {HORAS_DIA.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={modalLabelStyle}>Aprobar cita</label>
                    <select name="estado" value={formCita.estado} onChange={handleChangeCita} style={modalInputStyle}>
                      <option value="">Seleccione el estado de la cita</option>
                      <option value="Pendiente">⚠️ Pendiente</option>
                      <option value="Confirmada">📋 Confirmada</option>
                      <option value="Atendida">✅ Atendida</option>
                      <option value="Cancelada">❌ Cancelada</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button
                    onClick={handleSaveConfigCita}
                    disabled={!formCita.id}
                    style={{ ...profileStyles.button, opacity: !formCita.id ? 0.5 : 1 }}>
                    Cambiar cita
                  </button>
                </div>
              </div>
            )}

            {/* ── AGREGAR / VER / EDITAR PACIENTE MODAL ── */}
            {(modalMode === 'addPaciente' || modalMode === 'viewPaciente' || modalMode === 'editPaciente') && (
              <div style={{ display: 'flex', gap: '28px' }}>
                {modalMode === 'addPaciente' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '110px' }}>
                    <h2 style={{ fontSize: '16px', color: '#000', marginBottom: '16px', textAlign: 'center' }}>Agregar paciente</h2>
                    <div style={{ width: '75px', height: '75px', color: '#1B4F72' }}><PacientesIcon /></div>
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  {modalMode !== 'addPaciente' && (
                    <h2 style={{ fontSize: '22px', color: '#000', marginBottom: '18px' }}>
                      {modalMode === 'editPaciente' ? 'Editar paciente' : 'Ver paciente'}
                    </h2>
                  )}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Nombres</label>
                      <input type="text" name="nombres" placeholder="Ingrese el nombre" value={formPaciente.nombres} onChange={handleChangePaciente} readOnly={modalMode === 'viewPaciente'}
                        style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Apellidos</label>
                      <input type="text" name="apellidos" placeholder="Ingrese los apellidos" value={formPaciente.apellidos} onChange={handleChangePaciente} readOnly={modalMode === 'viewPaciente'}
                        style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Edad</label>
                      <input type="number" name="edad" placeholder="Edad" value={formPaciente.edad} onChange={handleChangePaciente} readOnly={modalMode === 'viewPaciente'}
                        style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Teléfono</label>
                      <input type="text" name="telefono" placeholder="Número de teléfono" value={formPaciente.telefono} onChange={handleChangePaciente} readOnly={modalMode === 'viewPaciente'}
                        style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={modalLabelStyle}>Email</label>
                    <input type="email" name="email" placeholder="Correo electrónico" value={formPaciente.email} onChange={handleChangePaciente} readOnly={modalMode === 'viewPaciente'}
                      style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '7px 0', outline: 'none', color: '#555', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Médico Asignado</label>
                      {modalMode === 'viewPaciente' ? (
                        <div style={{ padding: '7px 0', color: '#555', borderBottom: '1px solid #f0f0f0' }}>{formPaciente.medicoAsignado || '—'}</div>
                      ) : (
                        <select name="medicoAsignado" value={formPaciente.medicoAsignado} onChange={handleChangePaciente} style={modalInputStyle}>
                          <option value="">Seleccione el médico</option>
                          {MEDICOS_LIST.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={modalLabelStyle}>Estado</label>
                      {modalMode === 'viewPaciente' ? (
                        <span style={{ background: formPaciente.estado === 'Activo' ? '#D4EDDA' : '#F8D7DA', color: formPaciente.estado === 'Activo' ? '#155724' : '#721C24', padding: '5px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', display: 'inline-block', marginTop: '7px' }}>
                          {formPaciente.estado}
                        </span>
                      ) : (
                        <select name="estado" value={formPaciente.estado} onChange={handleChangePaciente} style={modalInputStyle}>
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>
                        </select>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    {modalMode === 'addPaciente' && <button onClick={handleSavePaciente} style={profileStyles.button}>Agregar Paciente</button>}
                    {modalMode === 'viewPaciente' && <button onClick={handleCloseModal} style={profileStyles.button}>Cerrar</button>}
                    {modalMode === 'editPaciente' && (<>
                      <button onClick={handleCloseModal} style={profileStyles.button}>Cancelar</button>
                      <button onClick={handleSavePaciente} style={{ ...profileStyles.button, background: '#27AE60' }}>Guardar Cambios</button>
                    </>)}
                  </div>
                </div>
              </div>
            )}

            {/* ── DELETE PACIENTE CONFIRM ── */}
            {modalMode === 'deletePacienteConfirm' && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Eliminar paciente</h2>
                <p style={{ fontSize: '16px', marginBottom: '28px', fontWeight: '500', color: '#4F5B67' }}>¿Está seguro de que quiere<br />eliminar este paciente?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <button onClick={handleCloseModal} style={profileStyles.button}>Cancelar</button>
                  <button onClick={confirmDeletePaciente} style={{ ...profileStyles.button, background: '#E74C3C' }}>Eliminar</button>
                </div>
              </div>
            )}
            {/* ── ADD ESPECIALIDAD MODAL ── */}
            {modalMode === 'addEspecialidad' && (
              <div>
                <h2 style={{ fontSize: '20px', color: '#000', marginBottom: '20px' }}>Agregar especialidad</h2>
                <div style={{ marginBottom: '20px' }}>
                  <input type="text" placeholder="Ingrese la especialidad" value={newEspecialidad} onChange={e => setNewEspecialidad(e.target.value)}
                    style={{ width: '100%', border: 'none', borderBottom: '1px solid #ddd', background: 'transparent', padding: '10px 0', outline: 'none', color: '#333', fontSize: '15px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleAddEspecialidad} style={{ ...profileStyles.button, borderRadius: '20px', padding: '8px 16px', fontSize: '13px' }}>Agregar especialidad</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
