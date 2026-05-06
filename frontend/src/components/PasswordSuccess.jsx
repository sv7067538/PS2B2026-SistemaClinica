import { useNavigate } from 'react-router-dom';

function PasswordSuccess() {
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <div className="login-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>Exito </div>
                <h2>¡Contraseña actualizada!</h2>
                <p className="subtitle">Tu contraseña ha sido restablecida exitosamente.</p>

                <button 
                    onClick={() => navigate('/login')}
                    style={{ 
                        width: '100%',
                        background: '#2f86b6',
                        color: 'white',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Volver al inicio de sesión
                </button>
            </div>
        </div>
    );
}

export default PasswordSuccess;