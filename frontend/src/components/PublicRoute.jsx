import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    try {
      const { rol } = JSON.parse(user);
      if (rol === 'medico') return <Navigate to="/medico/dashboard" replace />;
      if (rol === 'admin') return <Navigate to="/admin/dashboard" replace />;
      return <Navigate to="/dashboard" replace />;
    } catch {
      return <Navigate to="/dashboard" replace />;
    }
  }
  return children;
}

export default PublicRoute;