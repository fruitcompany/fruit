<?php
    $con=mysqli_connect("localhost","gpas","r3dh0tSvr*","gpas");
    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $sql="UPDATE Course_Info
    SET
    Department ='$_POST[modDepartment]', Course_Title='$_POST[modCourse]', Description='$_POST[modDescription]', Units='$_POST[modUnit]', Type='$_POST[modType]'
    WHERE
    Course_Name='$_POST[modSimpleName]'";

    if (!mysqli_query($con,$sql))
    {
        die('Error: ' . mysqli_error($con));
    }

	mysqli_query($con,$sql);

    mysqli_close($con);

    Header("Location: default.html");
?>