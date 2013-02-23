<?php
/**
 * 
 * crud operation class. 
 * @author Brandyn Thornton <brandyn.thornton.707@my.csun.edu>
 *
 */
class QueryOperation
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
		
	/**
	 * create a new record
	 * @param stdClass $params new record
	 */
	function createRecord( stdClass $params )
	{
		$query = "insert into Student ( `Student_ID`, `First_Name`, `Last_Name`, `User_Name`, `Password`, `Email` )
		                    values ( '$params->s_id', '$params->fname', '$params->lname', '$params->username', '$params->password', '$params->email' )";
		mysql_query( $query );
		
		$params->id = mysql_insert_id();
		
		return $params;		
	}
	
	/**
	 * get table records
	 * @param stdClass $params provides records offset and limit
	 */
	function getResults( stdClass $params )
	{
		$query = "SELECT * FROM  `Student`";
		$qResult = mysql_query($query); 
		$listResult = array();		
		
	  	while($row = mysql_fetch_array($qResult))
	  	{
	  		array_push($listResult, $row );
	  	}			
		
	  	return $listResult;
	}
	
	/**
	 * update record
	 * @param stdClass $params row to update record
	 */
	function updateRecords( stdClass $params )
	{	
		if( isset( $params->id ) )
		{
			$query = "UPDATE  Student SET First_Name = '$params->fname', Last_Name = '$params->lname', User_Name = '$params->username', Password = '$params->password', Email = '$params->email' WHERE Student_ID = $params->s_id";
			mysql_query($query);
			
			$response = array( 'success'=>true, 'data'=>true );
			
			return $params;
		}
	}
	
	/**
	 * delete record
	 * @param stdClass $params, only required attribute is the id
	 */
	function destroyRecord( stdClass $params )
	{
		if( isset( $params->id ) )
		{
			$query = "DELETE FROM Student WHERE Student_ID = $params->s_id LIMIT 1";
			mysql_query($query);
			
			return $params;
		}
	}
	
	
}