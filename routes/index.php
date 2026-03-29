<?php

$request = $_SERVER['REQUEST_URI'];

if (strpos($request, "/cursos") !== false) {
    require __DIR__ . "/../controllers/cursos/cursos.php";
}