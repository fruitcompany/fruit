<?php

	$request_method = strtolower($_GET['_verb']);  
	error_log( "type " . $request_method );
	// route the request to the right place
	$result = '{"success":false}';
	switch( $request_method )
	{
		case 'read':
			
		break;
		case 'create':
			$put = file_get_contents("php://input", 'r' );
			$params = json_decode( $put );
			$result = $controller->$action_name($params);
		break;
		case 'update':
			$put = file_get_contents("php://input", 'r' );
			$params = json_decode( $put );
			$result = $controller->$action_name($params);
		break;
		case 'delete':
			$put = file_get_contents("php://input", 'r' );
			$result = $controller->$action_name($params);
		break;
	echo $result;
?>