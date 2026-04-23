<?php
$_SERVER['REQUEST_METHOD'] = 'POST';
$_POST['email'] = 'ana@correo.com';
$_POST['password'] = '123456';
require 'login_process.php';
?>
