<?php session_start(); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - Sistema Clínico</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <header>
        <div class="logo-container">
            <div class="logo-circle">+</div>
            SISTEMA CLINICO
        </div>
        <nav>
            <a href="#">INICIO</a>
            <a href="#">SOBRE NOSOTROS</a>
        </nav>
    </header>

    <main>
        <div class="login-container">
            <h2>Iniciar Sesion</h2>
            <p class="subtitle">Bienvenido, por favor ingrese tus credenciales</p>

            <form id="loginForm">
                <div class="input-group">
                    <input type="email" id="email" name="email" placeholder="Correo electrónico" autocomplete="email">
                    <div class="error-text" id="email-error">Correo electrónico incorrecto</div>
                </div>

                <div class="input-group">
                    <input type="password" id="password" name="password" placeholder="Contraseña" autocomplete="current-password">
                    <div class="error-text" id="password-error">Contraseña incorrecta</div>
                </div>

                <div id="general-error" class="error-text" style="margin-bottom: 10px;"></div>

                <button type="submit" id="submitBtn">Iniciar Sesion</button>
            </form>

            <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
    </main>

    <footer>
        <div class="footer-social">
            <span>📞</span>
            <span>📧</span>
            <span>📱</span>
        </div>
        <div class="footer-copyright">
            Copyright 2026 - Clinica Sistema
        </div>
        <div class="footer-locations">
            <strong>UBICACIONES</strong>
            <div>📍 Emergencia: Av. La Paz</div>
            <div>📍 Ingreso Principal: Calle el Alto</div>
        </div>
    </footer>

    <script src="assets/js/login.js"></script>
</body>
</html>
