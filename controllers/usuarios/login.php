<?php
include __DIR__ . "/../../config/conexion.php";
$data = json_decode(file_get_contents("php://input"), true);

$correo = $data["correo"];
$password = $data["password"];

$sql = "SELECT * FROM usuarios WHERE correo='$correo'";
$result = $conn->query($sql);

if($result->num_rows > 0){

    $usuario = $result->fetch_assoc();

    if(password_verify($password,$usuario["password"])){

        echo json_encode([
            "mensaje"=>"Login correcto",
            "usuario"=>$usuario
        ]);

    }else{
        echo json_encode(["error"=>"Contraseña incorrecta"]);
    }

}else{
    echo json_encode(["error"=>"Usuario no encontrado"]);
}

?>