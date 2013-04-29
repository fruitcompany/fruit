<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>Untitled 1</title>
</head>

<body>

</body>
<?php
	//$a=$_GET["a"];
	//$b=$_GET["b"];
	//$c=$_GET["c"];
	//$d=$_GET["d"];
	//$e=$_GET["e"];
	//$f=$_GET["f"];
	//
	//echo "a+b+c+d+e+f"
	
	$q=$_GET["q"];
	$con=mysqli_connect("localhost","gpas","r3dh0tSvr*","gpas");
	
	if (mysqli_connect_errno($con))
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	echo "
	<form method='post' action='modifyClass.php' id='modifyClass'>	
	<table style='width: 100%' bgcolor='#F2F2F2'>
		<tr>
			<td>Deparment:</td>
			<td><select id='modifyDeptSelect' name='modDepartment'>
	";
	
		$sql = "SELECT distinct Department FROM `Course_Info`";
		$result = mysqli_query($con,$sql);
		while($row = mysqli_fetch_array($result))
		{
			if ($q == $row[Department])
			{
				echo "<option selected='selected' value='".$row['Department']."'>".$row['Department']."</option>";
			}
			else
			{
				echo "<option value='".$row['Department']."'>".$row['Department']."</option>";
			}
		}
	$sql = "SELECT * FROM `Course_Info` WHERE `Course_Name` = '".$q."'";
	$result = mysqli_query($con,$sql);
	while ($row = mysqli_fetch_array($result))
	       {
	echo "
		</select></td>
		</tr>
		<tr>
			<td style='height: 29px'>Simple Course Name:</td>
			<td>
			<input id='modifyCourseName' name='modSimpleName' type='text' disabled='disabled' value='".$row['Course_Name']."' />
			</td>
		</tr>
		<tr>
			<td>Course Title:</td>
			<td><input id='modifyCourseTitle' type='text' name='modCourse' value='".$row['Course_Title']."' /></td>
		</tr>
		<tr>
			<td>Type:</td>
			<td><select id='modifyTypeSelect' name='modType' >";
			if ($row['Type']=='Lab')
			{
				echo "<option selected='selected' value='Lab'>Lab</option>";
			}
			else
			{
				echo "<option value='Lab'>Lab</option>";
			}
			if ($row['Type']=='Lecture')
			{
				echo "<option selected='selected' value='Lecture'>Lecture</option>";
			}
			else
			{
				echo "<option value='Lecture'>Lecture</option>";
			}
			if ($row['Type']=='Seminar')
			{
				echo "<option selected='selected' value='Seminar'>Seminar</option>";
			}
			else
			{
				echo "<option value='Seminar'>Seminar</option>";
			}
			echo "
			</select></td>
		</tr>
		<tr>
			<td>Unit:</td>
			<td><select id='modifyUnitSelect' name='modUnit'>";
			for ($i=1; $i <=9; $i++)
			{
				if($row['Units'] == $i)
				{
					echo "<option selected='selected' value='".$i."'>".$i."</option>";
				}
				else
				{
					echo "<option value='".$i."'>".$i."</option>";
				}
			}
			echo "
			</select></td>
		</tr>
		<tr>
			<td>Description:</td>
			<td><textarea cols='70' id='modifyDescription' rows='3' name='modDescription'>asdf</textarea></td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>
			<input name='Submit3' type='submit' value='Modify Course' />&nbsp;</td>
		</tr>
	</table>
	
	</form>
	";
	       }
?> 
</html>
