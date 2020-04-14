<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
include('../connection.php');

$sql = 'SELECT DISTINCT `auditorium` FROM lesson';
$result = prepareQuery($dbh, $sql);

echo json_encode($result);

function prepareQuery($dbh, $sql)
{
    $sth = $dbh->prepare($sql);
    $sth->execute();

    return $sth->fetchAll(PDO::FETCH_OBJ);
}
