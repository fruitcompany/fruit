<?php
    $con=mysqli_connect("localhost","gpas","r3dh0tSvr*","gpas");
    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $user=$_POST['username'];
    $pass=$_POST['password'];
    $sql="SELECT Password FROM Admin_Users
    WHERE
    User_Name='$user'";
    echo $sql;

    if (!mysqli_query($con,$sql))
    {
        die('Error: ' . mysqli_error($con));
    }

	$result=mysqli_query($con,$sql);
	Header("Location: default.html");
	$row = mysqli_fetch_array($result);
	$value=$row[0];
	echo $value;
	if (count($row) > 0)
	{
		if ($value == $pass)
		{
		    Header("Location: course/default.html", true);
		    setcookie("validity", "valid", time()+3600);
		}
		else
		{
		    Header("Location: default.html", true);
		    setcookie("validity", "invalid", time()+9600);
		    echo "invalid account";
		}
	}
	else
	{
	    setcookie("validity", "invalid", time()+9600);
	    echo "invalid account";
	}
	
    mysqli_close($con);
    
    
?>