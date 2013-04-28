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
		if(isset($request->year, $request->term))
		{
			$year = $request->year;
			$term = $request->term;
			$courses = array();

			$query = "SELECT ca.Class_ID, ca.Year, ca.Term, ci.*
						FROM Class_Availability AS ca, Course_Info AS ci
						WHERE Year = '$year' AND Term = '$term'
						AND ca.Course_Name = ci.Course_Name
						AND (ci.Department = 'GE' OR ci.Department = 'Computer Science')";
			$qResult = mysql_query($query);
			while($course = mysql_fetch_assoc($qResult)){
				array_push($courses, $course);
			}

			return '{"success":true, "classes" : '.json_encode($courses).'}';
		}
		else {
			return '{"success":false, "msg":invalid request, "request":'.json_encode($request).'}';
		}
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
					$ids["oldID"] = $value->O_Class_ID;
					$query = "SELECT Class_ID FROM  Class_Availability WHERE Course_Name = '$value->Course_Name' and Year = $value->Year and Term = '$value->Term'";
					$qResult = mysql_query($query);

					if($qResult != NULL && mysql_num_rows($qResult) == 1)
					{
						$row = mysql_fetch_array($qResult, MYSQL_ASSOC);
						$ids["newID"] = $row["Class_ID"];
						$query = "UPDATE Path SET Class_ID = ".$row["Class_ID"]." WHERE Class_ID = $value->O_Class_ID and Path_ID = $value->path_id";
						$Result = mysql_query($query);
					}
					else
					{
						$query = "INSERT INTO Class_Availability (Class_ID, Course_Name, Year, Term) VALUES (NULL, '$value->Course_Name', $value->Year, '$value->Term')";
						$qResult = mysql_query($query);
						$insertID = mysql_insert_id();
						$ids["newID"] = $insertID;
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
					$ids["oldID"] = $request->O_Class_ID;
					$query = "SELECT Class_ID FROM  Class_Availability WHERE Course_Name = '$request->Course_Name' and Year = $request->Year and Term = '$request->Term'";
					$qResult = mysql_query($query);

					if($qResult != NULL && mysql_num_rows($qResult) == 1)
					{
						$row = mysql_fetch_array($qResult, MYSQL_ASSOC);
						$ids["newID"] = $row["Class_ID"];
						$query = "UPDATE Path SET Class_ID = ".$row["Class_ID"]." WHERE Class_ID = $request->O_Class_ID and Path_ID = $request->path_id";
						$Result = mysql_query($query);
					}
					else
					{
						$query = "INSERT INTO Class_Availability (Class_ID, Course_Name, Year, Term) VALUES (NULL, '$request->Course_Name', $request->Year, '$request->Term')";
						$qResult = mysql_query($query);
						$insertID = mysql_insert_id();
						$ids["newID"] = $insertID;
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
?>