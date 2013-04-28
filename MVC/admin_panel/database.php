<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title></title>
</head>

<body>
<?php
	$sql=$_GET["q"];
	$type=$_GET["t"];

	$con=mysqli_connect("localhost","gpas","r3dh0tSvr*","gpas");
	
	if (mysqli_connect_errno($con))
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	if (($type == 1) || ($type == 3) || ($type == 4))
	{
		mysqli_query($con,$sql);
	}
	else
	{
		$result = mysqli_query($con,$sql);
		while($row = mysqli_fetch_array($result))
		{
			echo "<option value='".$row[Course_Name]."'>".$row[Course_Name]."</option>";
		}
	}

	mysqli_close($con);
?>


</body>

</html>
