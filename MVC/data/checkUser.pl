#!/usr/bin/perl

use DBI;
#use DBD::mysql;

use 5.010;
use CGI;

use strict;
use warnings;

# MYSQL CONFIG VARIABLES
my $database = "gpas";
my $user     = "gpas";
my $pw       = "r3dh0tSvr*";
my $host     = "localhost";
#my $host     = "jd-research.ecs.csun.edu";
my $dsn      = "dbi:mysql:$database:$host";

my $q = CGI->new();
say $q->header();

my $uname = $q->param('uname');
my $sid = $q->param('sid');

say $uname." - ".$sid;

my $query = "SELECT Student_ID FROM Student WHERE Student_ID = '$sid' OR User_Name = '$uname'";
my $h = runSql($query);

my @row_ary  = $h->fetchrow_array;
for my $row (@row_ary) {
    say $row;
}


sub runSql {
    my($sql)    = @_;
    my $dbh     = DBI->connect($dsn, $user, $pw) or die print"Unable to connect: $DBI::errstr\n";
    my $handler = $dbh->prepare($sql) or croak("error: " . $dbh->errstr);
 
    warn($sql . "\n");
    $handler->execute or croak("error: " . $dbh->errstr);
    return $handler;
}