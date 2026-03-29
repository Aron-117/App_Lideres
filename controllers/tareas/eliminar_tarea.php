<?php
include __DIR__ . "/../../config/conexion.php";
$id = $_GET["id_tarea"] ?? "";

if(empty($id)){
    echo json_encode(["error"=>"ID requerido"]);
    exit;
}

$sql = "DELETE FROM tareas WHERE id_tarea='$id'";

if($conn->query($sql)){
    echo json_encode(["mensaje"=>"Tarea eliminada"]);
}else{
    echo json_encode(["error"=>$conn->error]);
}
?>
