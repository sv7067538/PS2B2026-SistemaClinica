<?php
session_start();
require_once 'includes/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($email)) {
        echo json_encode(['success' => false, 'field' => 'email', 'message' => 'Correo electrónico requerido']);
        exit;
    }

    if (empty($password)) {
        echo json_encode(['success' => false, 'field' => 'password', 'message' => 'Contraseña requerida']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT id_usuario, nombre, password, rol FROM usuarios WHERE email = :email LIMIT 1");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch();

        if ($user) {
            // Verificar contraseña (se asume que están guardadas con password_hash)
            if (password_verify($password, $user['password']) || $password === $user['password']) { 
                // NOTA: '$password === $user['password']' es para pruebas si la BD no tiene hash aún, 
                // pero se recomienda fuertemente usar SÓLO password_verify.

                // Guardar datos en sesión
                $_SESSION['user_id'] = $user['id_usuario'];
                $_SESSION['user_nombre'] = $user['nombre'];
                $_SESSION['user_rol'] = $user['rol'];

                // Determinar redirección según el rol, por defecto dashboard.php
                $redirect = 'dashboard.php';
                if ($user['rol'] === 'admin') $redirect = 'admin_dashboard.php';
                else if ($user['rol'] === 'medico') $redirect = 'medico_dashboard.php';
                
                echo json_encode(['success' => true, 'redirect' => $redirect]);
            } else {
                echo json_encode(['success' => false, 'field' => 'password', 'message' => 'Contraseña incorrecta']);
            }
        } else {
            echo json_encode(['success' => false, 'field' => 'email', 'message' => 'Correo electrónico incorrecto']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'field' => 'general', 'message' => 'Error de base de datos']);
    }

} else {
    echo json_encode(['success' => false, 'field' => 'general', 'message' => 'Método no permitido']);
}
?>
