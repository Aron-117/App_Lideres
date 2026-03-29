<?php
include __DIR__ . "/../../config/conexion.php";
$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"] ?? "";
$correo = $data["correo"] ?? "";
$password = $data["password"] ?? "";

/* VALIDAR DATOS VACIOS */
if(empty($nombre) || empty($correo) || empty($password)){
    echo json_encode([
        "error" => "Todos los campos son obligatorios"
    ]);
    exit;
}

/* ENCRIPTAR PASSWORD */
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

/* INSERT */
$sql = "INSERT INTO usuarios(nombre, correo, password, rol)
VALUES('$nombre','$correo','$passwordHash','usuario')";

if($conn->query($sql)){
    echo json_encode([
        "mensaje" => "Usuario registrado correctamente"
    ]);
}else{
    echo json_encode([
        "error" => $conn->error
    ]);
}
?>