<?php
include __DIR__ . "/../../config/conexion.php";$id = $_GET["id_curso"] ?? "";

if(empty($id)){
    echo json_encode(["error"=>"ID requerido"]);
    exit;
}

$sql = "DELETE FROM cursos WHERE id_curso='$id'";

if($conn->query($sql)){
    echo json_encode(["mensaje"=>"Curso eliminado"]);
}else{
    echo json_encode(["error"=>$conn->error]);
}
?>