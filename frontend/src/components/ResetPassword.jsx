import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email, token } = location.state || {};

    if (!email || !token) {
        navigate('/forgot-password');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/password/resetear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token, nuevaPassword: password })
            });

            const data = await response.json();

            if (data.success) {
                navigate('/password-success');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Restablecer Contraseña</h2>
                <p className="subtitle">Ingresa tu nueva contraseña</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-text general-error">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Actualizando...' : 'Restablecer contraseña'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;