<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
include('./connection.php');

$sql = 'SELECT DISTINCT `title` FROM groups';
$result = prepareQuery($dbh, $sql);

$sql = 'SELECT DISTINCT `name` FROM teacher';
$result = array_merge(prepareQuery($dbh, $sql), $result);

$sql = 'SELECT DISTINCT `auditorium` FROM lesson';
$result = array_merge(prepareQuery($dbh, $sql), $result);

echo json_encode($result);

function prepareQuery($dbh, $sql)
{
    $sth = $dbh->prepare($sql);
    $sth->execute();

    return $sth->fetchAll(PDO::FETCH_OBJ);
}
