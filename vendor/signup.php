<?php 
	session_start();
	require_once 'connect.php';

	// $_POST = json_decode(file_get_contents("php://input"), true);

	$login = trim($_POST['login']);
	$email = trim($_POST['email']);
	$password = trim($_POST['password']);
	$password_confirm = trim($_POST['password']);


	if ($login === '' || $email === '' || $password === '' || $password_confirm === '') {
		$response = [
			"status" => false,
			"message" => 'Введите данные'
		];

		echo json_encode($response);
		exit();
	}

	$check_users = mysqli_query($connect, "SELECT * FROM `users` WHERE `login` = '$login' OR `email` = '$email'");


	if (mysqli_num_rows($check_users) > 0){
		
		$user = mysqli_fetch_assoc($check_users);

		if ($user['login'] === $login){

			$response = [
				"status" => false,
				"message" => 'Пользователь с таким логином уже существует'
			];

			echo json_encode($response);

			// $_SESSION['message'] = 'Пользователь с таким логином уже существует';
			// header('Location: ../registration.php');
			exit();

		}elseif ($user['email'] === $email){

			$response = [
				"status" => false,
				"message" => 'Пользователь с такой почтой уже существует'
			];

			echo json_encode($response);

			// $_SESSION['message'] = 'Пользователь с такой почтой уже существует';
			// header('Location: ../registration.php');
			exit();
		}
		
	} elseif ($password === $password_confirm){
		
		$password = md5($password) . 'mc4f3g8e2k1';

		mysqli_query($connect, "INSERT INTO `users` (`id`, `email`, `login`, `password`) VALUES (NULL, '$email', '$login', '$password')");

		$response = [
			"status" => true,
			"message" => 'Успешно зарегестрировались'
		];

		echo json_encode($response);

		// $_SESSION['message'] = 'Регистрация прошла успешно';
		// header('Location: ../index.php');

	} else{
		$response = [
			"status" => false,
			"message" => 'Пароли не совпадают'
		];

		echo json_encode($response);

		// $_SESSION['message'] = 'Пароли не совпадают';
		// header('Location: ../registration.php');
		
	}



 ?>

