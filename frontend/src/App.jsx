import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Footer from './components/Footer';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './components/ForgotPassword';
import VerifyCode from './components/VerifyCode';
import ResetPassword from './components/ResetPassword';
import PasswordSuccess from './components/PasswordSuccess';
import Paciente from './pages/Paciente';
import Dashboard  from './pages/Dashboard';
import MisCitas from './pages/MisCitas';
import MedicoDashboard from './pages/MedicoDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import MedicoCitas from './pages/MedicoCitas';
import MedicoPacientes from './pages/MedicoPacientes';
import CrearHistorial from './pages/CrearHistorial';
import HistorialClinico from './pages/HistorialClinico';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Servicios />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route path="/completar-perfil" element={<Paciente />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="/medico/dashboard" element={<MedicoDashboard />} />
        <Route path="/medico/dashboard" element={<MedicoDashboard />} />
<Route path="/doctor/dashboard" element={<DoctorDashboard />} />
<Route path="/medico/citas" element={<MedicoCitas />} />
<Route path="/medico/pacientes" element={<MedicoPacientes />} />
<Route path="/medico/crear-historial" element={<CrearHistorial />} />
<Route path="/medico/historial" element={<HistorialClinico />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;