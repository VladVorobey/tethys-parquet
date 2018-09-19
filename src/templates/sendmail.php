<?php
	$SITE_TITLE = 'TETHYS PARQUET';
	$SITE_DESCR = '';

	if ( isset($_POST) ) {
		$name = htmlspecialchars(trim($_POST['name']));
		$email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
		$tel = isset($_POST['tel']) ? htmlspecialchars(trim($_POST['tel'])) : '';

		$to = 'Elena357910@yandex.com';

		$headers = "From: $SITE_TITLE \r\n";
		// $headers .= "Reply-To: ". $email . "\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";

		$data = '<h1>'.$subject."</h1>";
		$data .= 'Имя: '.$name."<br>";
		$data .= 'E-mail: '.$email."<br>";
		$data .= 'Телефон: '.$tel."<br>";

	
		$message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
				".$data."
				<br>\n
				<hr>\n
				<br>\n
				<small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
		$send = mail($to, $subject, $message, $headers);

		if ( $send ) {
			echo '';
		} else {
				echo '<div class="error">Ошибка отправки формы</div>';
		}

	}
	else {
			echo '<div class="error">Ошибка, данные формы не переданы.</div>';
	}
	die();
?>
