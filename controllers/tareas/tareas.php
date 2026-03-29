<?php
include __DIR__ . "/../../config/conexion.php";


$id_curso = $_GET["id_curso"];

$sql = "SELECT * FROM tareas WHERE id_curso='$id_curso'";
$result = $conn->query($sql);

$tareas = [];

while($row = $result->fetch_assoc()){
    $tareas[] = $row;
}

echo json_encode($tareas);

?>