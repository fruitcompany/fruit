#!/usr/bin/perl

use DBI;
#use DBD::mysql;
use CGI;
#use JSON;
#use Encode;

#print "Content-type: application.json";
my $cgi = CGI->new;
#my $data = $cgi->all_parameters,
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

#print $cgi->header(-type => "application/json", -charset => "utf-8");
print $cgi->param("username").", ".$cgi->param("password");

sub runSql {
    my($sql)    = @_;
    my $dbh     = DBI->connect($dsn, $user, $pw) or die print"Unable to connect: $DBI::errstr\n";
    my $handler = $dbh->prepare($sql) or croak("error: " . $dbh->errstr);
 
    warn($sql . "\n");
    $handler->execute or croak("error: " . $dbh->errstr);
    return $handler;
}