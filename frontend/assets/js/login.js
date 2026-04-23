document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const errorEmail = document.getElementById('email-error');
    const errorPassword = document.getElementById('password-error');
    const errorGeneral = document.getElementById('general-error');
    const submitBtn = document.getElementById('submitBtn');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Limpiar errores previos
        inputEmail.classList.remove('error-input');
        inputPassword.classList.remove('error-input');
        errorEmail.style.display = 'none';
        errorPassword.style.display = 'none';
        errorGeneral.style.display = 'none';

        let hasError = false;
        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();

        if (email === '') {
            inputEmail.classList.add('error-input');
            errorEmail.style.display = 'block';
            errorEmail.textContent = "Correo electrónico requerido";
            hasError = true;
        }

        if (password === '') {
            inputPassword.classList.add('error-input');
            errorPassword.style.display = 'block';
            errorPassword.textContent = "Contraseña requerida";
            hasError = true;
        }

        if (hasError) return;

        // Estado de carga
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Enviando...';

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch('login_process.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Redirigir según el rol o al panel principal
                window.location.href = result.redirect || 'dashboard.php';
            } else {
                if (result.field === 'email') {
                    inputEmail.classList.add('error-input');
                    errorEmail.style.display = 'block';
                    errorEmail.textContent = result.message;
                } else if (result.field === 'password') {
                    inputPassword.classList.add('error-input');
                    errorPassword.style.display = 'block';
                    errorPassword.textContent = result.message;
                } else {
                    errorGeneral.style.display = 'block';
                    errorGeneral.textContent = result.message;
                }
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            errorGeneral.style.display = 'block';
            errorGeneral.textContent = "Error al intentar iniciar sesión. Inténtelo de nuevo.";
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Iniciar Sesion';
        }
    });
});
