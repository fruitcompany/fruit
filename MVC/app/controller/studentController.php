<?php
require_once 'logger/error_log.php'; //enables printing log messages to logger/error_log.txt
require_once 'pathController.php'; //enables printing log messages to logger/error_log.txt
class studentController
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
		if(isset($request->id))
		{
			$query = "SELECT * FROM  `Student` WHERE Student_ID = $request->id";
		}
		else
		{
			$query = "SELECT * FROM  `Student`";
		}
        
		$qResult = mysql_query($query); 
		$listResult = array();		

	  	while($row = mysql_fetch_array($qResult, MYSQL_ASSOC))
	  	{
			$params = new stdClass();
			$params->s_id = $row["Student_ID"];
			$pathControl = new pathController();
			
	  		$listResult["Student_ID"] = $row["Student_ID"];
			$listResult["First_Name"] = $row["First_Name"];
			$listResult["Last_Name"] = $row["Last_Name"];
			$listResult["User_Name"] = $row["User_Name"];
			$listResult["Password"] = $row["Password"];
			$listResult["Email"] = $row["Email"];
			$listResult["paths"] = $pathControl->readAction($params);
	  	}			
	  	return '{"success":true,"students":[' . json_encode($listResult) . ']}';//array( 'success'=>true, 'data'=>$listResult );
    }
 
    public function createAction($request) {
        $query = "insert into Student ( `Student_ID`, `First_Name`, `Last_Name`, `User_Name`, `Password`, `Email` )
		                    values ( '$request->s_id', '$request->fname', '$request->lname', '$request->username', '$request->password', '$request->email' )";
		$goodToGo = mysql_query($query);
		$request->id = 1;
		if($goodToGo)
			return '{"success":true,"students":[' . json_encode($request) . ']}';
		else
			return '{"success":false,"students":[' . json_encode($request) . ']}';
		return '{"success":false}';	
    }
	
	public function updateAction($request) {
        if( isset( $request->s_id ) )
		{
			$query = "UPDATE  Student SET First_Name = '$request->fname', Last_Name = '$request->lname', User_Name = '$request->username', Password = '$request->password', Email = '$request->email' WHERE Student_ID = $request->s_id";
			$goodToGo = mysql_query($query);
			if($goodToGo)
				return '{"success":true,"students":[' . json_encode($request) . ']}';
			else
				return '{"success":false,"students":[' . json_encode($request) . ']}';
			return '{"success":false}';	
		}
    }
	
	public function deleteAction($request) {
			$query = "DELETE FROM Student WHERE Student_ID = $request->s_id LIMIT 1";
			$goodToGo = mysql_query($query);
			if($goodToGo)
				return '{"success":true,"students":[' . json_encode($request) . ']}';
			else
				return '{"success":false,"students":[' . json_encode($request) . ']}';
			return '{"success":false}';	
    }
}
?>