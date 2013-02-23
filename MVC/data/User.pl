#!/usr/bin/perl

use DBI;
use DBD::mysql;
use CGI;
#use JSON;
#use Encode;

#print "Content-type: application.json";
my $cgi = CGI->new;
my $data = $cgi->all_parameters,
#my $self = shift;
#my $params = $self->{params};
#my $data = $params->{data};

# MYSQL CONFIG VARIABLES
$database = "gpas";
$user     = "gpas";
$pw       = "r3dh0tSvr*";
$host     = "localhost";
#$host     = "jd-research.ecs.csun.edu";
$dsn      = "dbi:mysql:$database:$host";

print $cgi->header(-type => "application/json", -charset => "utf-8");
print "hey I did something";
print $data;


sub login {
	my $self  = shift;
	my $params = $self->{params};
	my($sql,$sth,@row, $json, $manager, $key, $value);
	my $data = $params->{data};
    
	my $decodeddata = decode_json $data; 
	
	
	
	#$json = to_json({success => $success, result => $result});

	$self->processInlineContent($data);
	$self->setState('login');
}


#$query = "SELECT * FROM Course_Info";
#@headers = ("Course_Name", "Department", "Course_Title", "Description", "Units", "Type");

#printTable($query,\@headers);


sub printTable {
	my($q,$h)	= @_;
	$i = 0;
	
	$query_handle = runSql($q);
	
	# HTML TABLE
	print "<table border='1'><tr>";
	while(@$h[$i]){
		print "<th>@$h[$i]</th>";
		$i++;
	}
	print "</tr>";
	
	while (@results = $query_handle->fetchrow_array) {
		$n = 0;
		print "<tr>";
		while ($results[$n]){
			print "<td>$results[$n]</td>";
			$n++;
		}
		print "</tr>";
	}
	
	print "</table>";
}

sub runSql {
    my($sql)    = @_;
    my $dbh     = DBI->connect($dsn, $user, $pw) or die print"Unable to connect: $DBI::errstr\n";
    my $handler = $dbh->prepare($sql) or croak("error: " . $dbh->errstr);
 
    warn($sql . "\n");
    $handler->execute or croak("error: " . $dbh->errstr);
    return $handler;
}