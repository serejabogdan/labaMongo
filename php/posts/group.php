<?php
include('../connection.php');

$jsonContent = file_get_contents('php://input');
$jsonDecoded = json_decode($jsonContent, true);

$sql = "SELECT `ID_Groups` FROM `groups` WHERE title = :keyValue";
$groupId = prepareQuery($dbh, $sql, $jsonDecoded);

$sql = "SELECT `ID_Lesson` FROM `lesson` ORDER BY ID_Lesson DESC LIMIT 1";
$lessonId = prepareQuery($dbh, $sql, array());

$sql = "INSERT INTO `lesson_groups`(`FID_Lesson2`, `FID_Groups`) VALUES (:lessonId, :groupId)";
prepareQuery($dbh, $sql, array('lessonId' => $lessonId[0], 'groupId' => $groupId[0]));

function prepareQuery($dbh, $sql, $jsonDecoded = null)
{
    $sth = $dbh->prepare($sql);
    $sth->execute($jsonDecoded);

    return $sth->fetchAll(PDO::FETCH_COLUMN);
}