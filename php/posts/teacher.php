<?php
include('../connection.php');

$jsonContent = file_get_contents('php://input');
$jsonDecoded = json_decode($jsonContent, true);

$sql = "SELECT `ID_Teacher` FROM `teacher` WHERE `name` = :keyValue";
$teacherId = prepareQuery($dbh, $sql, $jsonDecoded);

$sql = "SELECT `ID_Lesson` FROM `lesson` ORDER BY ID_Lesson DESC LIMIT 1";
$lessonId = prepareQuery($dbh, $sql, array());

$sql = "INSERT INTO `lesson_teacher`(`FID_Teacher`, `FID_Lesson1`) VALUES (:teacherId, :lessonId)";
prepareQuery($dbh, $sql, array('teacherId' => $teacherId[0], 'lessonId' => $lessonId[0]));


function prepareQuery($dbh, $sql, $jsonDecoded = null)
{
    $sth = $dbh->prepare($sql);
    $sth->execute($jsonDecoded);

    return $sth->fetchAll(PDO::FETCH_COLUMN);
}