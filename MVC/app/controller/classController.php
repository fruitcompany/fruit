<<<<<<< HEAD
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
=======
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
		$ids = array();
		if(is_array($request))
		{
	        foreach ($request as $value)
			{
		        if(isset($value->Course_Name, $value->Year, $value->Term))
				{
					$ids["oldID"][] = $value->id;
					$query = "SELECT Class_ID FROM  Class_Availability WHERE Course_Name = '$value->Course_Name' and Year = $value->Year and Term = '$value->Term'";
					$qResult = mysql_query($query);
		
					if($qResult != NULL && mysql_num_rows($qResult) == 1)
					{
						$row = mysql_fetch_array($qResult, MYSQL_ASSOC);
						$ids["newID"][] = $row["Class_ID"];
						$query = "UPDATE Path SET Class_ID = ".$row["Class_ID"]." WHERE Class_ID = $value->id and Path_ID = $value->path_id";
						$Result = mysql_query($query);
					}
					else
					{
						$query = "INSERT INTO Class_Availability (Class_ID, Course_Name, Year, Term) VALUES (NULL, '$value->Course_Name', $value->Year, '$value->Term')";
						$qResult = mysql_query($query);
						$insertID = mysql_insert_id();
						$ids["newID"][] = $insertID;
						$query = "UPDATE Path SET Class_ID = $insertID WHERE Class_ID = $value->id and Path_ID = $value->path_id";
						$Result = mysql_query($query);
					}
				}
			}
			unset($value);
		}
		else
		{
			if(isset($request->Course_Name, $request->Year, $request->Term))
			{
				$ids["oldID"][] = $request->id;
				$query = "SELECT Class_ID FROM  Class_Availability WHERE Course_Name = '$request->Course_Name' and Year = $request->Year and Term = '$request->Term'";
				$qResult = mysql_query($query);
	
				if($qResult != NULL && mysql_num_rows($qResult) == 1)
				{
					$row = mysql_fetch_array($qResult, MYSQL_ASSOC);
					$ids["newID"][] = $row["Class_ID"];
					$query = "UPDATE Path SET Class_ID = ".$row["Class_ID"]." WHERE Class_ID = $request->id and Path_ID = $request->path_id";
					$Result = mysql_query($query);
				}
				else
				{
					$query = "INSERT INTO Class_Availability (Class_ID, Course_Name, Year, Term) VALUES (NULL, '$request->Course_Name', $request->Year, '$request->Term')";
					$qResult = mysql_query($query);
					$insertID = mysql_insert_id();
					$ids["newID"][] = $insertID;
					$query = "UPDATE Path SET Class_ID = $insertID WHERE Class_ID = $request->id and Path_ID = $request->path_id";
					$Result = mysql_query($query);
				}
			}
			else {
				return '{"success":false, "msg":invalid request, "request":'.json_encode($request).'}';
			}
		}
        return '{"success":true, "ids":' . json_encode($ids) . '}';
    }
	
	public function deleteAction($request) {
		return '{"success":true}';
    }
}
>>>>>>> 4f70124dace1f01aa3edbc2c6eb7f12ee55d9d01
?>