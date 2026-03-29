<?php
include __DIR__ . "/../../config/conexion.php";
$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id_tarea"] ?? "";
$titulo = $data["titulo"] ?? "";
$descripcion = $data["descripcion"] ?? "";

if(empty($id)){
    echo json_encode(["error"=>"ID requerido"]);
    exit;
}

$sql = "UPDATE tareas 
SET titulo='$titulo', descripcion='$descripcion'
WHERE id_tarea='$id'";

if($conn->query($sql)){
    echo json_encode(["mensaje"=>"Tarea actualizada"]);
}else{
    echo json_encode(["error"=>$conn->error]);
}
?>