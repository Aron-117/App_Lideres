<?php
include __DIR__ . "/../../config/conexion.php";
$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"] ?? "";
$descripcion = $data["descripcion"] ?? "";
$cupos = $data["cupos"] ?? "";

if(empty($nombre) || empty($descripcion) || empty($cupos)){
    echo json_encode(["error"=>"Datos incompletos"]);
    exit;
}

$sql = "INSERT INTO cursos(nombre, descripcion, cupos)
VALUES('$nombre','$descripcion','$cupos')";

if($conn->query($sql)){
    echo json_encode(["mensaje"=>"Curso creado"]);
}else{
    echo json_encode(["error"=>$conn->error]);
}
?>