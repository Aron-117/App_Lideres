<?php
include __DIR__ . "/../../config/conexion.php";
$id_usuario = $_POST["id_usuario"];
$id_tarea = $_POST["id_tarea"];

$archivo = $_FILES["archivo"]["name"];
$ruta = "uploads/" . $archivo;

move_uploaded_file($_FILES["archivo"]["tmp_name"], $ruta);

$sql = "INSERT INTO entregas(id_tarea,id_usuario,archivo_entregado)
VALUES('$id_tarea','$id_usuario','$ruta')";

if($conn->query($sql)){
    echo json_encode(["mensaje"=>"Tarea subida"]);
}else{
    echo json_encode(["error"=>$conn->error]);
}

?