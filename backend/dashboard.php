<?php
session_start();

// Simulación de sesión si no existe para propósitos de visualización
if (!isset($_SESSION['user_nombre'])) {
    $_SESSION['user_nombre'] = 'Nicolas Hernandez';
    $_SESSION['user_rol'] = 'Paciente';
}

$user_nombre = $_SESSION['user_nombre'];
$user_rol = $_SESSION['user_rol'];
$clinica_nombre = 'Uroclinic';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Paciente - Sistema Clínico</title>
    <link rel="stylesheet" href="assets/css/dashboard.css">
    <!-- FontAwesome para los iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="dashboard-container">
        <!-- Topbar -->
        <header class="topbar">
            <div class="logo-container">
                <div class="logo-circle"><i class="fa-solid fa-plus"></i></div>
                SISTEMA CLINICO
            </div>
            <div class="user-menu">
                <div class="user-icon-small"><i class="fa-regular fa-user"></i></div>
            </div>
        </header>

        <div class="dashboard-body">
            <!-- Menú Lateral Izquierdo -->
            <aside class="sidebar-left">
                <nav class="side-nav">
                    <a href="#" class="active" id="nav-inicio">
                        <i class="fa-solid fa-house"></i>
                        <span>Inicio</span>
                    </a>
                    <a href="#" id="nav-miscitas">
                        <i class="fa-regular fa-calendar-check"></i>
                        <span>Mis citas</span>
                    </a>
                    <a href="#" id="nav-notificaciones">
                        <i class="fa-regular fa-bell"></i>
                        <span>Notificaciones</span>
                    </a>
                    <a href="#" id="nav-datospaciente">
                        <i class="fa-solid fa-user-injured"></i>
                        <span>Datos del<br>paciente</span>
                    </a>
                </nav>
            </aside>

            <!-- Contenido Principal -->
            <main class="main-content">
                
                <!-- SECCION INICIO -->
                <div id="section-inicio">
                    <div class="content-header">
                        <h1>Inicio</h1>
                        <h2>¡Hola, <?php echo htmlspecialchars($user_nombre); ?>!</h2>
                        <p class="welcome-text">Bienvenido a tu propio espacio de salud</p>
                    </div>

                    <div class="quick-actions">
                        <h3>Acciones rapidas</h3>
                        <div class="action-cards-container">
                            <div class="card green-card" id="btn-programar" style="cursor:pointer;">
                                <div class="card-header">Programar citas</div>
                                <div class="card-icon">
                                    <i class="fa-solid fa-calendar-plus"></i>
                                </div>
                            </div>
                            <div class="card light-blue-card" id="btn-irmiscitas" style="cursor:pointer;">
                                <div class="card-header">Ir a mis citas</div>
                                <div class="card-icon">
                                    <i class="fa-solid fa-calendar-check"></i>
                                </div>
                            </div>
                            <div class="card dark-blue-card" id="btn-irnotificaciones" style="cursor:pointer;">
                                <div class="card-header">Ir a mis notificaciones</div>
                                <div class="card-icon">
                                    <i class="fa-solid fa-bell"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECCION MIS CITAS -->
                <div id="section-miscitas" style="display: none;">
                    <div class="content-header-miscitas">
                        <h1>Mis citas</h1>
                        <div class="miscitas-controls">
                            <div class="tabs">
                                <button class="tab-btn active">Todas las citas</button>
                                <button class="tab-btn">Proximas citas</button>
                                <button class="tab-btn">Citas pasadas</button>
                            </div>
                            <div class="search-bar">
                                <i class="fa-solid fa-bars"></i>
                                <input type="text" placeholder="Buscar...">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                    </div>

                    <div class="miscitas-list">
                        <div class="appointment-card">
                            <div class="appointment-avatar">
                                <img src="https://ui-avatars.com/api/?name=Javier+Choque&background=ff6b6b&color=fff&rounded=true&size=150" alt="Dr. Javier Choque">
                            </div>
                            <div class="appointment-details">
                                <p class="appointment-date">24 de abril, Martes, 17:00</p>
                                <h3 class="appointment-doctor">Dr. Javier Choque</h3>
                                <p class="appointment-specialty">Odontologia</p>
                            </div>
                            <div class="appointment-action">
                                <button class="btn-contactar">Contactar medico</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECCION NOTIFICACIONES -->
                <div id="section-notificaciones" style="display: none;">
                    <div class="content-header">
                        <h1>Notificaciones</h1>
                    </div>

                    <div class="notifications-list">
                        <div class="notification-item">
                            <div class="notification-icon bg-yellow">
                                <i class="fa-solid fa-circle-exclamation"></i>
                            </div>
                            <div class="notification-text">
                                Tu cita de pediatria ha sido reprogramada para el 25 de abril, 3.00 PM
                            </div>
                        </div>
                        <div class="notification-item">
                            <div class="notification-icon bg-yellow">
                                <i class="fa-solid fa-circle-exclamation"></i>
                            </div>
                            <div class="notification-text">
                                Tu cita de odontologia ha sido reprogramada para el 29 de abril, 3.00 PM
                            </div>
                        </div>
                        <div class="notification-item">
                            <div class="notification-icon bg-green">
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <div class="notification-text">
                                Tu cita de odontologia ha sido confirmada para el 29 de abril, 3.00 PM
                            </div>
                        </div>
                        <div class="notification-item">
                            <div class="notification-icon bg-green">
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <div class="notification-text">
                                Tu cita de pediatria ha sido confirmada para el 25 de abril, 3.00 PM
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECCION DATOS DEL PACIENTE -->
                <div id="section-datospaciente" style="display: none;">
                    <div class="content-header">
                        <h1>Datos del paciente</h1>
                    </div>
                    
                    <div class="patient-data-container">
                        <div class="patient-large-icon">
                            <i class="fa-solid fa-circle-user"></i>
                        </div>
                        <div class="patient-details-list">
                            <p><strong>Nombre completo:</strong> Nicolas Javier Hernandez Gomes</p>
                            <p><strong>Telefono:</strong> +582 73090151</p>
                            <p><strong>Ciudad:</strong> La Paz</p>
                            <p><strong>Direccion:</strong> Calle El Alamo #123</p>
                            <p><strong>Correo:</strong> NicoJavl23@gmail.com</p>
                        </div>
                    </div>
                </div>

            </main>

            <!-- Panel Lateral Derecho -->
            <aside class="sidebar-right">
                <div class="profile-section">
                    <div class="large-avatar">
                        <div class="avatar-icon">
                            <i class="fa-solid fa-user-nurse"></i>
                        </div>
                        <div class="avatar-ring"></div>
                    </div>
                    <h2 class="profile-name"><?php echo htmlspecialchars($user_nombre); ?></h2>
                    <p class="profile-role"><?php echo htmlspecialchars($user_rol); ?> - <?php echo htmlspecialchars($clinica_nombre); ?></p>
                </div>
            </aside>
        </div>
    </div>

    <!-- MODAL AGREGAR CITA -->
    <div id="modal-cita" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Agregar Cita</h2>
                <button class="close-btn" id="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-icon">
                    <i class="fa-regular fa-calendar-plus" style="font-size: 100px; color: #000;"></i>
                </div>
                <div class="modal-form">
                    <div class="form-group">
                        <label>Paciente:</label>
                        <input type="text" placeholder="Ingrese paciente">
                    </div>
                    <div class="form-group">
                        <label>Hora:</label>
                        <input type="text" placeholder="Ingrese hora">
                    </div>
                    <div class="form-group">
                        <label>Estado:</label>
                        <input type="text" placeholder="Ingrese estado">
                    </div>
                    <div class="form-group">
                        <label>Motivo:</label>
                        <input type="text" placeholder="Ingrese motivo de la cita">
                    </div>
                </div>
                <div class="modal-date-action">
                    <div class="date-group">
                        <label>Fecha:</label>
                        <div class="date-inputs">
                            <input type="text" placeholder="DD" maxlength="2" class="date-part">
                            <input type="text" placeholder="MM" maxlength="2" class="date-part">
                            <input type="text" placeholder="YYYY" maxlength="4" class="date-part year">
                        </div>
                    </div>
                    <button class="btn-agregar-cita">Agregar cita</button>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/dashboard.js"></script>
</body>
</html>
