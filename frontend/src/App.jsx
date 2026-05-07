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
      </Routes>
      <Footer />
    </>
  );
}

export default App;