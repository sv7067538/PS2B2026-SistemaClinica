-- ================= CREAR BASE DE DATOS =================
CREATE DATABASE IF NOT EXISTS clinica_bd;
USE clinica_db;

-- ================= TABLA: especialidad =================
CREATE TABLE IF NOT EXISTS especialidad (
    id_especialidad INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- ================= TABLA: clinica =================
CREATE TABLE IF NOT EXISTS clinica (
    id_clinica INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    direccion TEXT
);

-- ================= TABLA: usuarios (para autenticación) =================
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
     VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'medico', 'recepcionista', 'paciente') DEFAULT 'paciente',
    email VARCHAR(150),
    estado TINYINT(1) DEFAULT 1,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ================= TABLA: personal_medico =================
CREATE TABLE IF NOT EXISTS personal_medico (
    id_medico INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(150),
    cargo VARCHAR(100),
    id_especialidad INT,
    id_clinica INT,
    id_usuario INT,
    FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad) ON DELETE SET NULL,
    FOREIGN KEY (id_clinica) REFERENCES clinica(id_clinica) ON DELETE SET NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

-- ================= TABLA: paciente =================
CREATE TABLE IF NOT EXISTS paciente (
    id_paciente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    ci VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    email VARCHAR(150),
    genero ENUM('M', 'F', 'O') DEFAULT 'M',
    fecha_nacimiento DATE,
    tipo_sangre VARCHAR(5),
    alergias TEXT,
    id_usuario INT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

-- ================= TABLA: horarios =================
CREATE TABLE IF NOT EXISTS horarios (
    id_horario INT PRIMARY KEY AUTO_INCREMENT,
    id_medico INT NOT NULL,
    dia ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_medico) REFERENCES personal_medico(id_medico) ON DELETE CASCADE
);

-- ================= TABLA: citas =================
CREATE TABLE IF NOT EXISTS citas (
    id_cita INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT NOT NULL,
    id_medico INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Completada') DEFAULT 'Pendiente',
    motivo TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente) ON DELETE CASCADE,
    FOREIGN KEY (id_medico) REFERENCES personal_medico(id_medico) ON DELETE CASCADE
);

-- ================= TABLA: historial_clinico =================
CREATE TABLE IF NOT EXISTS historial_clinico (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT NOT NULL,
    id_medico INT NOT NULL,
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    motivo_consulta TEXT,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente) ON DELETE CASCADE,
    FOREIGN KEY (id_medico) REFERENCES personal_medico(id_medico) ON DELETE CASCADE
);

-- ================= TABLA: imagenes_historial =================
CREATE TABLE IF NOT EXISTS imagenes_historial (
    id_imagen INT PRIMARY KEY AUTO_INCREMENT,
    id_historial INT NOT NULL,
    ruta VARCHAR(500) NOT NULL,
    nombre_original VARCHAR(200),
    fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_historial) REFERENCES historial_clinico(id_historial) ON DELETE CASCADE
);

-- ================= TABLA: notificaciones =================
CREATE TABLE IF NOT EXISTS notificaciones (
    id_notificacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    leido TINYINT(1) DEFAULT 0,
    tipo ENUM('cita', 'recordatorio', 'alerta', 'info') DEFAULT 'info',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- ================= INSERTAR DATOS DE PRUEBA =================

-- Insertar clínicas
INSERT INTO clinica (nombre, direccion) VALUES
('Clínica Uroclinic Central', 'Av. La Paz #1234, Zona Central'),
('Clínica Uroclinic Norte', 'Calle El Alto #567, Zona Norte');

-- Insertar especialidades
INSERT INTO especialidad (nombre, descripcion) VALUES
('Cardiología', 'Especialidad médica que trata las enfermedades del corazón y sistema circulatorio'),
('Pediatría', 'Especialidad médica dedicada al cuidado de la salud de niños y adolescentes'),
('Dermatología', 'Especialidad médica que trata las enfermedades de la piel, cabello y uñas'),
('Odontología', 'Especialidad que trata las enfermedades de los dientes y encías'),
('Medicina General', 'Atención médica primaria y chequeos preventivos'),
('Emergencia', 'Atención de urgencias médicas 24/7'),
('Vacunatorio', 'Centro de vacunación para todas las edades');

-- Insertar usuarios (contraseña: '123456' en texto plano - luego encriptar)
INSERT INTO usuarios (nombre_usuario, contrasena, rol, email) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrJZqQ7XqRqVqXqRqVqXqRqVqXqRqV', 'admin', 'admin@uroclinic.com'),
('drjuan', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrJZqQ7XqRqVqXqRqVqXqRqVqXqRqV', 'medico', 'juan.perez@uroclinic.com'),
('dramaria', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrJZqQ7XqRqVqXqRqVqXqRqVqXqRqV', 'medico', 'maria.lopez@uroclinic.com'),
('carlos_paciente', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrJZqQ7XqRqVqXqRqVqXqRqVqXqRqV', 'paciente', 'carlos@gmail.com');

-- Insertar personal médico
INSERT INTO personal_medico (nombre, apellido, telefono, email, cargo, id_especialidad, id_clinica, id_usuario) VALUES
('Juan', 'Pérez', '71234567', 'juan.perez@uroclinic.com', 'Cardiólogo Jefe', 1, 1, 2),
('María', 'López', '72345678', 'maria.lopez@uroclinic.com', 'Pediatra', 2, 1, 3),
('Carlos', 'Mendoza', '73456789', 'carlos.mendoza@uroclinic.com', 'Dermatólogo', 3, 2, NULL),
('Ana', 'Fernández', '74567890', 'ana.fernandez@uroclinic.com', 'Odontóloga', 4, 1, NULL),
('Roberto', 'Sánchez', '75678901', 'roberto.sanchez@uroclinic.com', 'Médico General', 5, 2, NULL);

-- Insertar pacientes
INSERT INTO paciente (nombre, apellido, ci, telefono, direccion, email, genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario) VALUES
('Carlos', 'González', '1234567', '78912345', 'Av. Libertad #456', 'carlos@gmail.com', 'M', '1990-05-15', 'O+', 'Ninguna', 4),
('Laura', 'Rodríguez', '7654321', '79876543', 'Calle Sucre #789', 'laura@gmail.com', 'F', '1985-10-20', 'A+', 'Penicilina', NULL),
('Pedro', 'Martínez', '9876543', '71234567', 'Av. América #321', 'pedro@gmail.com', 'M', '1978-03-08', 'B-', 'Polen', NULL),
('Sofía', 'Ramírez', '4567890', '73456789', 'Calle Bolívar #654', 'sofia@gmail.com', 'F', '1995-12-25', 'AB+', 'Ninguna', NULL),
('Jorge', 'Torres', '1357924', '74567890', 'Av. San Martín #987', 'jorge@gmail.com', 'M', '2000-07-30', 'O-', 'Lactosa', NULL);

-- Insertar horarios
INSERT INTO horarios (id_medico, dia, hora_inicio, hora_fin) VALUES
(1, 'Lunes', '08:00:00', '12:00:00'),
(1, 'Lunes', '14:00:00', '18:00:00'),
(1, 'Martes', '08:00:00', '12:00:00'),
(1, 'Miércoles', '14:00:00', '18:00:00'),
(2, 'Lunes', '09:00:00', '13:00:00'),
(2, 'Martes', '09:00:00', '13:00:00'),
(2, 'Miércoles', '14:00:00', '18:00:00'),
(3, 'Jueves', '08:00:00', '12:00:00'),
(3, 'Viernes', '08:00:00', '12:00:00'),
(4, 'Lunes', '14:00:00', '18:00:00'),
(4, 'Miércoles', '14:00:00', '18:00:00'),
(5, 'Martes', '14:00:00', '18:00:00'),
(5, 'Jueves', '14:00:00', '18:00:00');

-- Insertar citas
INSERT INTO citas (id_paciente, id_medico, fecha, hora, estado, motivo) VALUES
(1, 1, '2026-05-15', '09:00:00', 'Confirmada', 'Chequeo cardiológico anual'),
(2, 2, '2026-05-16', '10:30:00', 'Pendiente', 'Control pediátrico'),
(3, 3, '2026-05-17', '11:00:00', 'Confirmada', 'Revisión de lunar'),
(4, 4, '2026-05-18', '15:00:00', 'Pendiente', 'Limpieza dental'),
(5, 5, '2026-05-19', '09:30:00', 'Completada', 'Dolor de cabeza');

-- Insertar historial clínico
INSERT INTO historial_clinico (id_paciente, id_medico, diagnostico, tratamiento, observaciones, motivo_consulta) VALUES
(1, 1, 'Hipertensión leve', 'Medicación diaria, control de presión', 'Paciente responde bien al tratamiento', 'Chequeo anual'),
(2, 2, 'Vacunación completa', 'Esquema de vacunación al día', 'Desarrollo normal', 'Control de salud'),
(3, 3, 'Lunar benigno', 'Observación, sin tratamiento necesario', 'Sin cambios sospechosos', 'Revisión dermatológica');

-- Insertar imágenes del historial
INSERT INTO imagenes_historial (id_historial, ruta, nombre_original) VALUES
(1, '/uploads/historial/1/presion_arterial.jpg', 'presion_arterial.jpg'),
(3, '/uploads/historial/3/lunar_espalda.jpg', 'lunar_espalda.jpg');

-- Insertar notificaciones
INSERT INTO notificaciones (id_usuario, titulo, mensaje, tipo) VALUES
(1, 'Bienvenido al sistema', 'Gracias por registrarse en Uroclinic', 'info'),
(2, 'Nueva cita asignada', 'Tiene una cita programada para el día 15/05/2026', 'cita'),
(4, 'Recordatorio de cita', 'Su cita con Cardiología es mañana a las 9:00 AM', 'recordatorio'),
(2, 'Paciente nuevo', 'Se ha asignado un nuevo paciente a su consultorio', 'alerta');

-- ================= VISTAS ÚTILES =================

-- Vista de citas con información completa
CREATE OR REPLACE VIEW vista_citas_completas AS
SELECT 
    c.id_cita,
    p.nombre AS paciente_nombre,
    p.apellido AS paciente_apellido,
    p.ci AS paciente_ci,
    m.nombre AS medico_nombre,
    m.apellido AS medico_apellido,
    e.nombre AS especialidad,
    c.fecha,
    c.hora,
    c.estado,
    c.motivo
FROM citas c
JOIN paciente p ON c.id_paciente = p.id_paciente
JOIN personal_medico m ON c.id_medico = m.id_medico
LEFT JOIN especialidad e ON m.id_especialidad = e.id_especialidad;

-- Vista de horarios de médicos
CREATE OR REPLACE VIEW vista_horarios_medicos AS
SELECT 
    m.id_medico,
    m.nombre,
    m.apellido,
    e.nombre AS especialidad,
    h.dia,
    h.hora_inicio,
    h.hora_fin
FROM personal_medico m
JOIN horarios h ON m.id_medico = h.id_medico
LEFT JOIN especialidad e ON m.id_especialidad = e.id_especialidad
WHERE h.activo = 1
ORDER BY m.apellido, FIELD(h.dia, 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');

-- ================= ÍNDICES PARA OPTIMIZACIÓN =================

CREATE INDEX idx_citas_fecha ON citas(fecha);
CREATE INDEX idx_citas_estado ON citas(estado);
CREATE INDEX idx_paciente_ci ON paciente(ci);
CREATE INDEX idx_historial_fecha ON historial_clinico(fecha);
CREATE INDEX idx_notificaciones_usuario ON notificaciones(id_usuario, leido);
CREATE INDEX idx_horarios_medico ON horarios(id_medico, dia);

-- ================= USUARIO PARA LA APLICACIÓN =================
-- Crear usuario para la aplicación (opcional)
-- CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY 'app_password_2026';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON clinica_db.* TO 'app_user'@'localhost';
-- FLUSH PRIVILEGES;