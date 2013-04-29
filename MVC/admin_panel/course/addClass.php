<?php
    $con=mysqli_connect("localhost","gpas","r3dh0tSvr*","gpas");
    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $sql="INSERT INTO Course_Info (Course_Name, Department, Course_Title, Description, Units, Type)
    VALUES
    ('$_POST[addSimpleName]','$_POST[addDept]','$_POST[addCourseTitle]','$_POST[addDescription]','$_POST[addUnit]','$_POST[addType]')";

    if (!mysqli_query($con,$sql))
    {
        die('Error: ' . mysqli_error($con));
    }

	mysqli_query($con,$sql);
	
    mysqli_close($con);
    
    Header("Location: default.html");
?>