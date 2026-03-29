<?php
require_once __DIR__ . "/../config/conexion.php";

class Tarea {
    private $conn;

    public function __construct() {
        $this->conn = conexion();
    }

    // Obtener tareas
    public function obtener() {
        $sql = "SELECT * FROM tareas";
        $result = $this->conn->query($sql);

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        return $data;
    }

    // Crear tarea
    public function crear($id_curso, $titulo, $descripcion, $archivo, $fecha_entrega) {
        $stmt = $this->conn->prepare(
            "INSERT INTO tareas(id_curso, titulo, descripcion, archivo_material, fecha_entrega)
             VALUES (?, ?, ?, ?, ?)"
        );

        $stmt->bind_param("issss", $id_curso, $titulo, $descripcion, $archivo, $fecha_entrega);

        return $stmt->execute()
            ? ["status" => "success"]
            : ["status" => "error"];
    }

    // Eliminar tarea
    public function eliminar($id) {
        $stmt = $this->conn->prepare(
            "DELETE FROM tareas WHERE id_tarea = ?"
        );

        $stmt->bind_param("i", $id);
        $stmt->execute();

        return ["status" => "deleted"];
    }
}