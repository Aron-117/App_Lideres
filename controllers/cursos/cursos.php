<?php
require_once __DIR__ . "/../../models/Curso.php";

header("Content-Type: application/json");

$curso = new Curso();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        echo json_encode($curso->obtener());
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['nombre']) || !isset($data['descripcion'])) {
            echo json_encode(["error" => "Datos incompletos"]);
            exit;
        }

        echo json_encode(
            $curso->crear($data['nombre'], $data['descripcion'])
        );
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;

        if (!$id) {
            echo json_encode(["error" => "ID requerido"]);
            exit;
        }

        echo json_encode($curso->eliminar($id));
        break;
}