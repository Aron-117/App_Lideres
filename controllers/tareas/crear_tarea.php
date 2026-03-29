<?php
include __DIR__ . "/../../config/conexion.php";
$data = json_decode(file_get_contents("php://input"), true);

$id_curso = $data["id_curso"] ?? "";
$titulo = $data["titulo"] ?? "";
$descripcion = $data["descripcion"] ?? "";

if(empty($id_curso) || empty($titulo)){
    echo json_encode(["error"=>"Datos incompletos"]);
    exit;
}

$sql = "INSERT INTO tareas(id_curso,titulo,descripcion)
VALUES('$id_curso','$titulo','$descripcion')";

if($conn->query($sql)){
    echo json_encode(["mensaje"=>"Tarea creada"]);
}else{
    echo json_encode(["error"=>$conn->error]);
}
?>