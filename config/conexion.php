
<?php
function conexion() {
    $conn = new mysqli("localhost", "root", "", "app_cursos");

    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    $conn->set_charset("utf8");
    return $conn;
}