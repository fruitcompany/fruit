<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title></title>
</head>

<body>
<?php
	$q=$_GET["q"];
	
	$con=mysqli_connect("localhost","gpas","r3dh0tSvr*","gpas");
	
	if (mysqli_connect_errno($con))
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	//$sql="SELECT ".$q." FROM Course_Info";
	$sql="SELECT * FROM Students";
	$result = mysqli_query($con,"SELECT * FROM Student");
	echo "listen";
	while($row = mysqli_fetch_array($result))
	{
		echo "<option value=".$row['First_Name'].">".$row['Last_Name']."</option>";
	}

	mysqli_close($con);
?>


</body>

</html>
