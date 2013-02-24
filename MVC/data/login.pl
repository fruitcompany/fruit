#!/usr/bin/perl

use DBI;
#use DBD::mysql;
use CGI;


my $cgi = CGI->new;

# MYSQL CONFIG VARIABLES
#$database = "gpas";
#$user     = "gpas";
#$pw       = "r3dh0tSvr*";
#$host     = "localhost";
##$host     = "jd-research.ecs.csun.edu";
#$dsn      = "dbi:mysql:$database:$host";
print $cgi->header(-type => "text/plain", -charset => "utf-8");

for my $param ($q->param()) {
    my $safe_param = $q->escapeHTML($param);
    print $param;
    for my $value ($q->param($param)) {
        print $value;
    }
}



#print $cgi->header(-type => "application/json", -charset => "utf-8");
#print $cgi->param("username").", ".$cgi->param("password");

#sub runSql {
#    my($sql)    = @_;
#    my $dbh     = DBI->connect($dsn, $user, $pw) or die print"Unable to connect: $DBI::errstr\n";
#    my $handler = $dbh->prepare($sql) or croak("error: " . $dbh->errstr);
# 
#    warn($sql . "\n");
#    $handler->execute or croak("error: " . $dbh->errstr);
#    return $handler;
#}