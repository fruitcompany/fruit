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
			$params->studentRequest = true;
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
		                    values ( '$request->Student_ID', '$request->First_Name', '$request->Last_Name', '$request->User_Name', '$request->Password', '$request->Email' )";
		$goodToGo = mysql_query($query);
		$request->id = 1;
		if($goodToGo)
		{
			$row = mysql_fetch_array($goodToGo, MYSQL_ASSOC);
			$request->id = $row["Student_ID"];
			return '{"success":true,"students":[' . json_encode($request) . ']}';
		}
		else
			return '{"success":false,"students":[' . json_encode($request) . ']}';
		return '{"success":false}';
    }

	public function updateAction($request) {
		//erase all path data for the student
		if(!empty($request->student->paths))
		{
			$count = 1;
			$s_id = $request->student->data->Student_ID;
			$query = "SELECT `Path_ID` FROM Path_Choice WHERE `Student_ID` = ".$s_id;
			$goodToGo = mysql_query($query);
			if($goodToGo === FALSE) {
				echo("goodToGo");
			    die(mysql_error());
			}
			while($row = mysql_fetch_array($goodToGo, MYSQL_ASSOC))
		  	{
		  		$pathDeleteQuery = "DELETE FROM Path WHERE `Path_ID` = ".$row['Path_ID'];
		  		$goodToGo2 = mysql_query($pathDeleteQuery);
				if($goodToGo2 === FALSE) {
					echo("goodToGo2");
			    	die(mysql_error());
				}
		  		$pathRankQuery = "DELETE FROM Path_Rank WHERE `Path_ID` = ".$row['Path_ID'];
		  		$goodToGo3 = mysql_query($pathRankQuery);
		  		if($goodToGo3 === FALSE) {
		  			echo("goodToGo3");
			    	die(mysql_error());
				}
			}
			$query4 = "DELETE FROM Path_Choice WHERE `Student_ID` = ".$s_id;
			$goodToGo4 = mysql_query($query4);
			if($goodToGo4 === FALSE) {
				echo("goodToGo4");
		    	die(mysql_error());
			}

			//insert new path data for the student
			foreach ($request->student->paths as $value)
			{
				$path_rank = $value->data->Path_Rank;
				$path_id = $value->data->id;
				$createPathQuery = "INSERT INTO Path_Choice (`Path_ID`, `Student_ID`) VALUES (".$path_id.", ".$s_id.")";
				$goodToGo5 = mysql_query($createPathQuery);
				if($goodToGo5 === FALSE) {
					echo("goodToGo5");
			    	die(mysql_error());
				}
				$createPathQuery = "INSERT INTO Path_Rank (`Path_ID`, `Path_Rank`) VALUES (".$path_id.", ".$path_rank.")";
				$goodToGo6 = mysql_query($createPathQuery);
				if($goodToGo6 === FALSE) {
					echo("goodToGo6");
			    	die(mysql_error());
				}

				foreach ($value->semesters as $value2)
				{
					foreach ($value2->classes as $value3)
					{
						$c_id = $value3->data->Class_ID;
						$insertPathQuery = "INSERT INTO Path (`Path_ID`, `Class_ID`, `Semester`, `Order`) VALUES (".$path_id.", ".$c_id.", 0, ".$count.")";
						$goodToGo7 = mysql_query($insertPathQuery);
						if($goodToGo7 === FALSE) {
							echo("goodToGo7");
					    	die(mysql_error());
						}
						$count++;
					}
					unset($value3);
				}
				unset($value2);
				$count = 1;
			}
			unset($value);

			return '{"success":true}';
		}
		else
		{
			return '{"success":false}';
		}
    }

	public function deleteAction($request) {
			$query = "DELETE FROM Student WHERE Student_ID = $request->Student_ID LIMIT 1";
			$goodToGo = mysql_query($query);
			if($goodToGo)
				return '{"success":true,"students":[' . json_encode($request) . ']}';
			else
				return '{"success":false,"students":[' . json_encode($request) . ']}';
			return '{"success":false}';
    }

	public function getunamesAction($request) {
			$query = "SELECT User_Name, Student_ID FROM Student";
			$result = mysqli_query($query);
			echo "Hey We made it";
			$r = array();
			if($result){
				while ($row = mysql_fetch_object($result)) {
					array_push($r,array($row->User_Name,$row->Student_ID));
				}
				return '{"success":true,"students":' . json_encode($result) . '}';
			}
			else
				return '{"success":false,"students":[' . json_encode($request) . ']}';
			return '{"success":false}';
    }
}
?>