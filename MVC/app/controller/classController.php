<?php
require_once 'logger/error_log.php'; //enables printing log messages to logger/error_log.txt
class classController
{
	function __construct()
	{
		$conn = mysql_connect("localhost:3306", "gpas", "r3dh0tSvr*") or die(mysql_error());
		mysql_select_db("gpas", $conn ) or die(mysql_error());
	}

	function __destruct()
	{
		
	}
	
    public function readAction($request) {
		return '{"success":true}';
    }
 
    public function createAction($request) {
        return '{"success":true}';
    }
	
	public function updateAction($request) {
        return '{"success":true}';
    }
	
	public function deleteAction($request) {
		return '{"success":true}';
    }
}
?>