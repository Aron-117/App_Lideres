<?php
require_once __DIR__ . "/../config/conexion.php";

class Usuario {
    private $conn;

    public function __construct() {
        $this->conn = conexion();
    }

    // Obtener todos
    public function obtener() {
        $result = $this->conn->query("SELECT * FROM usuarios");

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        return $data;
    }

    // Crear usuario
    public function crear($nombre, $correo, $password, $rol) {
        $passHash = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $this->conn->prepare(
            "INSERT INTO usuarios(nombre, correo, password, rol) VALUES (?, ?, ?, ?)"
        );

        $stmt->bind_param("ssss", $nombre, $correo, $passHash, $rol);

        return $stmt->execute()
            ? ["status" => "success"]
            : ["status" => "error"];
    }

    // Login
    public function login($correo, $password) {
        $stmt = $this->conn->prepare(
            "SELECT * FROM usuarios WHERE correo = ?"
        );

        $stmt->bind_param("s", $correo);
        $stmt->execute();

        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            return ["status" => "success", "user" => $user];
        }

        return ["status" => "error"];
    }

    // Eliminar
    public function eliminar($id) {
        $stmt = $this->conn->prepare(
            "DELETE FROM usuarios WHERE id_usuario = ?"
        );

        $stmt->bind_param("i", $id);
        $stmt->execute();

        return ["status" => "deleted"];
    }
}