<?php
require_once __DIR__ . "/../config/conexion.php";

class Curso {
    private $conn;

    public function __construct() {
        $this->conn = conexion();
    }

    public function obtener() {
        $sql = "SELECT * FROM cursos";
        $result = $this->conn->query($sql);

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        return $data;
    }

    public function crear($nombre, $descripcion) {
        $stmt = $this->conn->prepare(
            "INSERT INTO cursos(nombre, descripcion) VALUES (?, ?)"
        );

        $stmt->bind_param("ss", $nombre, $descripcion);

        if ($stmt->execute()) {
            return ["status" => "success"];
        } else {
            return ["status" => "error"];
        }
    }

    public function eliminar($id) {
        $stmt = $this->conn->prepare(
            "DELETE FROM cursos WHERE id_curso = ?"
        );

        $stmt->bind_param("i", $id);
        $stmt->execute();

        return ["status" => "deleted"];
    }
}