<?php
include __DIR__ . "/../../config/conexion.php";
$data = json_decode(file_get_contents("php://input"), true);

$id_usuario = $data["id_usuario"];
$id_curso = $data["id_curso"];

$sql = "INSERT INTO inscripciones(id_usuario,id_curso,estado)
VALUES('$id_usuario','$id_curso','activo')";

if($conn->query($sql)){
    echo json_encode(["mensaje"=>"Inscripción exitosa"]);
}else{
    echo json_encode(["error"=>$conn->error]);
}

?>