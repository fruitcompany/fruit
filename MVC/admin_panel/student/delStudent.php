<?php
    $con=mysqli_connect("localhost","gpas","r3dh0tSvr*","gpas");
    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $sql="DELETE FROM Student_Info
    WHERE
    Student_ID='$_POST[delStudentID]'";

    if (!mysqli_query($con,$sql))
    {
        die('Error: ' . mysqli_error($con));
    }

	mysqli_query($con,$sql);
	
    mysqli_close($con);
    
    Header("Location: default.html");
?>