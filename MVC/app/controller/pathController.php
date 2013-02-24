<?php
require_once 'logger/error_log.php'; //enables printing log messages to logger/error_log.txt
class pathController
{
	function __construct()
	{
		$conn = mysql_connect("localhost:3306", "gpas", "r3dh0tSvr*") or die(mysql_error());
		mysql_select_db("gpas", $conn ) or die(mysql_error());
	}

	function __destruct()
	{
		mysql_close();
	}
	
    public function readAction($request) {
		
		$pathResult = array();
		$pathClasses = array();
		if(isset($request->id))
		{
			$query = "SELECT Class_ID FROM  `Path` WHERE Path_ID = $request->id";
			$qResult = mysql_query($query); 
				
			if($qResult != NULL && mysql_num_rows($qResult) > 0)
			{
				while($row = mysql_fetch_array($qResult, MYSQL_ASSOC))
				{
					$joinQuery = "SELECT Class_Availability.Class_ID, Class_Availability.Course_Name, Class_Availability.Year, Class_Availability.Term, Course_Info.Department, Course_Info.Course_Title, Course_Info.Description, Course_Info.Units, Course_Info.Type
								  FROM Class_Availability, Course_Info
								  WHERE Class_Availability.Class_ID = ".$row["Class_ID"]." and Class_Availability.Course_Name = Course_Info.Course_Name";
					$joinResult = mysql_query($joinQuery);
					if($joinResult != NULL && mysql_num_rows($joinResult) > 0)
					{
						$course = mysql_fetch_array($joinResult, MYSQL_ASSOC);
						$pathClasses["Class_ID"] = $row["Class_ID"];
						$pathClasses["Course_Name"] = $course["Course_Name"];
						$pathClasses["Year"] = $course["Year"];
						$pathClasses["Term"] = $course["Term"];
						$pathClasses["Department"] = $course["Department"];
						$pathClasses["Course_Title"] = $course["Course_Title"];
						$pathClasses["Description"] = $course["Description"];
						$pathClasses["Units"] = $course["Units"];
						$pathClasses["Type"] = $course["Type"];
						array_push($pathResult, $pathClasses);
					}
				}
			}
		}
		else if($request->s_id)
		{
			$query = "SELECT Path_Choice.Path_ID FROM gpas.Path_Choice, gpas.Path_Rank
					  WHERE Path_Choice.Student_ID = $request->s_id and Path_Choice.Path_ID = Path_Rank.Path_ID
					  ORDER BY Path_Rank.Path_Rank ASC";
					  
			$qResult = mysql_query($query); 
				
			if($qResult != NULL && mysql_num_rows($qResult) > 0)
			{
				while($row = mysql_fetch_array($qResult, MYSQL_ASSOC))
				{
					$params = new stdClass();
					$params->id = $row["Path_ID"];
					$tempArray["id"] = $row["Path_ID"];
					$tempArray["classes"] = $this->readAction($params);
					array_push($pathResult, $tempArray);
				}
				
			}
		}
		
	  	return $pathResult;
    }
 
    public function createAction($request) {
        $query = "insert into Student ( `Student_ID`, `First_Name`, `Last_Name`, `User_Name`, `Password`, `Email` )
		                    values ( '$request->s_id', '$request->fname', '$request->lname', '$request->username', '$request->password', '$request->email' )";
		$goodToGo = mysql_query($query);
		$request->id = 1;
		if($goodToGo)
			$response = array( 'success'=>true, 'data'=>$request );
		else
			$response = array( 'success'=>false, 'data'=>$request );
		return $response;	
    }
	
	public function updateAction($request) {
        if( isset( $request->s_id ) )
		{
			$query = "UPDATE  Student SET First_Name = '$request->fname', Last_Name = '$request->lname', User_Name = '$request->username', Password = '$request->password', Email = '$request->email' WHERE Student_ID = $request->s_id";
			$goodToGo = mysql_query($query);
			if($goodToGo)
			{
				$response = array( 'success'=>true, 'data'=>$request );
			}
			else
			{
				$response = array( 'success'=>false, 'data'=>$request );
			}
			return $response;
		}
    }
	
	public function deleteAction($request) {
			$query = "DELETE FROM Student WHERE Student_ID = $request->s_id LIMIT 1";
			$goodToGo = mysql_query($query);
			if($goodToGo)
			{
				$response = array( 'success'=>true, 'data'=>$request );
			}
			else
			{
				$response = array( 'success'=>false, 'data'=>$request );
			}
			return $response;
    }
}
?>