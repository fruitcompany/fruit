<?phprequire_once 'logger/error_log.php'; //enables printing log messages to logger/error_log.txt
spl_autoload_register('apiAutoload');function apiAutoload($classname){    if (preg_match('/[a-zA-Z]+Controller$/', $classname)) {        include __DIR__ . '/controller/' . $classname . '.php';        return true;    } }
	$request_method = strtolower($_GET['_verb']);  	$model_name = $_GET['_m'];	error_log( "model " . $model_name );
	error_log( "type " . $request_method );	if(isset($_GET['id']))		error_log( "id " . $_GET['id'] );
	// route the request to the right place	$controller_name = $model_name . 'Controller';if (class_exists($controller_name)) {	$controller = new $controller_name();	$action_name = strtolower($request_method) . 'Action';	
	$result = '{"success":false}';
	switch( $request_method )
	{
		case 'read':			if(isset($_GET['id']))			{				$params = new stdClass();				$params->id = $_GET['id'];				$result = $controller->$action_name($params);			}			else			{				$result = $controller->$action_name(new stdClass());			}
			
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
			$put = file_get_contents("php://input", 'r' );			$params = json_decode( $put );
			$result = $controller->$action_name($params);
		break;	}	header('Cache-Control: no-cache, must-revalidate');	header("content-type:application/json");
	echo $result;}
?>