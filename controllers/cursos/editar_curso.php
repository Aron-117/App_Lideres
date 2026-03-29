<?php
include __DIR__ . "/../../config/conexion.php";$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id_curso"] ?? "";
$nombre = $data["nombre"] ?? "";
$descripcion = $data["descripcion"] ?? "";
$cupos = $data["cupos"] ?? "";

if(empty($id)){
    echo json_encode(["error"=>"ID requerido"]);
    exit;
}

$sql = "UPDATE cursos 
SET nombre='$nombre', descripcion='$descripcion', cupos='$cupos'
WHERE id_curso='$id'";

if($conn->query($sql)){
    echo json_encode(["mensaje"=>"Curso actualizado"]);
}else{
    echo json_encode(["error"=>$conn->error]);
}
?>