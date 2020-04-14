<?php
include('../connection.php');

$jsonContent = file_get_contents('php://input');
$jsonDecoded = json_decode($jsonContent, true);

$sql = "INSERT INTO `lesson`(`week_day`, `lesson_number`, `auditorium`, `disciple`, `type`) VALUES (:week_day, :lesson_number, :auditorium, :discipline, 2)";

prepareQuery($dbh, $sql, $jsonDecoded);

function prepareQuery($dbh, $sql, $jsonDecoded)
{
    $sth = $dbh->prepare($sql);
    $sth->execute($jsonDecoded);

    return $sth->fetchAll(PDO::FETCH_OBJ);
}
