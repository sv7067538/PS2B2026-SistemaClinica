import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function VerifyCode() {
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    if (!email) {
        navigate('/forgot-password');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/password/verificar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, codigo })
            });

            const data = await response.json();

            if (data.success) {
                navigate('/reset-password', { state: { email, token: data.token } });
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
                <h2>Verificar Código</h2>
                <p className="subtitle">Ingresa el código de 6 dígitos que recibiste</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Código de verificación"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            maxLength={6}
                            style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '5px' }}
                            required
                        />
                    </div>

                    {error && <div className="error-text general-error">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Verificando...' : 'Verificar código'}
                    </button>
                </form>

                <a href="/forgot-password" className="forgot-password">Reenviar código</a>
                <a href="/login" className="forgot-password">Volver al inicio</a>
            </div>
        </div>
    );
}

export default VerifyCode;