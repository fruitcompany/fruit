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

my $name = $q->param('name');
my $year = $q->param('year');
my $term = $q->param('term');

my $query = "SELECT Class_ID FROM Class_Availability WHERE Course_Name = '$name' AND Year = '$year' AND Term = '$term'";
my $h = runSql($query);

my @row_ary  = $h->fetchrow_array;
for my $row (@row_ary) {
    say $row;
}



#for my $param ($q->param()) {
#    #my $safe_param = $q->escapeHTML($param);
#
#    #say "<p><strong>$safe_param</strong>: ";
#    say $param;
#
#    for my $value ($q->param($param)) {
#        say $value;
#    }
#}



#print $cgi->header(-type => "text/plain", -charset => "utf-8");
#print "hello";
#for my $param ($q->param()) {
#    my $safe_param = $q->escapeHTML($param);
#    print $param;
#    for my $value ($q->param($param)) {
#        print $value;
#    }
#}



#print $cgi->header(-type => "application/json", -charset => "utf-8");
#print $cgi->param("username").", ".$cgi->param("password");

sub runSql {
    my($sql)    = @_;
    my $dbh     = DBI->connect($dsn, $user, $pw) or die print"Unable to connect: $DBI::errstr\n";
    my $handler = $dbh->prepare($sql) or croak("error: " . $dbh->errstr);

    warn($sql . "\n");
    $handler->execute or croak("error: " . $dbh->errstr);
    return $handler;
}