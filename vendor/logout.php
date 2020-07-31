<?php 

session_start();
unset($_SESSION['user']);
setcookie('user', json_encode($user), time() - 3600 * 24 *30, "/");
header('Location: ../index.php');

 ?>