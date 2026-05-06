import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/password/solicitar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                setTimeout(() => {
                    navigate('/verify-code', { state: { email } });
                }, 2000);
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
                <h2>Recuperar Contraseña</h2>
                <p className="subtitle">Ingresa tu correo para recibir un código de verificación</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-text general-error">{error}</div>}
                    {success && <div style={{color: 'green', textAlign: 'center', marginBottom: '15px'}}>{success}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar código'}
                    </button>
                </form>

                <a href="/login" className="forgot-password">Volver al inicio de sesión</a>
            </div>
        </div>
    );
}

export default ForgotPassword;