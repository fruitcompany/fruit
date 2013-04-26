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

	}

    public function readAction($request) {

		$pathResult = array();
		$pathClasses = array();
		$pathRank = -1;
		$pathId = -1;
		if(isset($request->id))
		{
			$query = "SELECT Class_ID FROM  `Path` WHERE Path_ID = $request->id ORDER BY `Order`";
			$qResult = mysql_query($query);

			if($qResult != NULL && mysql_num_rows($qResult) > 0)
			{
				$semesterArray = array();
				while($row = mysql_fetch_array($qResult, MYSQL_ASSOC))
				{
					$joinQuery = "SELECT Class_Availability.Class_ID, Class_Availability.Course_Name, Class_Availability.Year, Class_Availability.Term, Course_Info.Department, Course_Info.Course_Title, Course_Info.Description, Course_Info.Units, Course_Info.Type
								  FROM Class_Availability, Course_Info
								  WHERE Class_Availability.Class_ID = ".$row["Class_ID"]." and Class_Availability.Course_Name = Course_Info.Course_Name
								  GROUP BY Class_Availability.Year ORDER BY Class_Availability.Year, Class_Availability.Term";
					$joinResult = mysql_query($joinQuery);
					if($joinResult != NULL && mysql_num_rows($joinResult) > 0)
					{
						$course = mysql_fetch_array($joinResult, MYSQL_ASSOC);
						$course["path_id"] = $request->id;
						if(!isset($semesterArray[$course["Term"]." ".$course["Year"]]))
						{
							$semesterArray[$course["Term"]." ".$course["Year"]] = array();
						}
						array_push($semesterArray[$course["Term"]." ".$course["Year"]], $course);
					}
				}
				foreach ($semesterArray as $key => $value)
				{
					$sem = explode(" ", $key);
					array_push($pathResult, array("id" => $key, "Term" => $sem[0], "Year" => $sem[1], "path_id" => $request->id, "classes" => $value));
				}
				unset($value);
				unset($key);

			}
			
			$r = mysql_fetch_array(mysql_query("SELECT Path_Rank FROM `Path_Rank` WHERE `Path_ID`=$request->id"));
			$pathRank = $r[0];
			$pathId = $request->id;
		}
		else if($request->s_id)
		{
			$query = "SELECT Path_Choice.Path_ID, Path_Rank.Path_Rank
					  FROM gpas.Path_Choice, gpas.Path_Rank
					  WHERE Path_Choice.Student_ID = $request->s_id and Path_Choice.Path_ID = Path_Rank.Path_ID
					  ORDER BY Path_Rank.Path_Rank ASC";

			$qResult = mysql_query($query);

			if($qResult != NULL && mysql_num_rows($qResult) > 0)
			{
				while($row = mysql_fetch_array($qResult, MYSQL_ASSOC))
				{
					$params = new stdClass();
					$params->studentRequest = true;
					$params->id = $row["Path_ID"];
					$tempArray["Path_Rank"] = $row["Path_Rank"];
					$tempArray["id"] = $row["Path_ID"];
					$tempArray["semesters"] = $this->readAction($params);
					array_push($pathResult, $tempArray);
				}

			}
		}
		if(isset($request->studentRequest))
		{
			return $pathResult;
		}
		else
		{
			return '{"success":true,"paths":[{"id":'.$pathId.', "Path_Rank":'.$pathRank.', "semesters":' . json_encode($pathResult) . '}]}';
		}
    }

    public function createAction($request) {
		//print_r($request);
        $query = "Select * From Default_Path Where `Major`='$request->Major' Order by `Order` ASC";
		$goodToGo = mysql_query($query);
		$major = $request->Major;
		$year = intval($request->Year);
		$id = $request->ID;
		$sems = array();
		$row = mysql_fetch_array(mysql_query("Select MAX(Path_ID) from `Path`"));
		$path_id = $row[0]+1;


		if($request->Semester == "FALL")
		{
			$sems[0] = "SPRING";
			$sems[1] = "FALL";
			$currSem = 0;
		}
		else
		{
			$sems[0] = "FALL";
			$sems[1] = "SPRING";
			$currSem = 1;
		}



		while($row = mysql_fetch_assoc($goodToGo)){
			$semcount = $row['Semester']%2;
			if($sems[$semcount]=="SPRING" && intval($row['Semester'])>$currSem){
				$year++;
				$currSem = intval($row['Semester']);
			}

			$course = $row['Course_Name'];
			$order = $row['Order'];

			//find the class by semester and year
			mysql_query("INSERT INTO `Path`
						VALUES ($path_id,
								(SELECT Class_ID FROM `Class_Availability`
									WHERE `Year`=$year AND `Term`='$sems[$semcount]' AND `Course_Name`='$course'),
								0,
								$order)") or die(mysql_error());

		}

		//set user id to have the path just created
		mysql_query("INSERT INTO `Path_Choice` VALUES ($path_id,$id)") or die(mysql_error());
		//set Path rank
		$r = mysql_fetch_array(mysql_query("SELECT COUNT(*) FROM `Path_Choice` WHERE `Student_ID`=$id"));
		mysql_query("INSERT INTO `Path_Rank` VALUES ($path_id,$r[0])") or die(mysql_error());


		return '{"success":true,"path_id":'.$path_id.'}';

    }

	public function updateAction($request){
        return '{"success":true}';
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