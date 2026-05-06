import './Login.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({ email: '', password: '', general: '' });

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                // Guardar token y datos del usuario
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirigir según el rol
                navigate(data.redirect);
            } else {
                // Mostrar error específico por campo
                if (data.field) {
                    setErrors(prev => ({ ...prev, [data.field]: data.message }));
                } else {
                    setErrors(prev => ({ ...prev, general: data.message }));
                }
            }
        } catch (error) {
            setErrors(prev => ({ 
                ...prev, 
                general: 'Nombre de usuario o contraseña incorrectos' 
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Iniciar Sesión</h2>
                <p className="subtitle">Bienvenido, por favor ingresa tus credenciales</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            autoComplete="email"
                        />
                        {errors.email && <div className="error-text">{errors.email}</div>}
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            autoComplete="current-password"
                        />
                        {errors.password && <div className="error-text">{errors.password}</div>}
                    </div>

                    {errors.general && <div className="error-text general-error">{errors.general}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <Link to="/signup" className="forgot-password">
                    ¿No tienes cuenta? Regístrate aquí
                </Link>
                <Link to="/forgot-password" className="forgot-password">
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>
        </div>
    );
}

export default Login;