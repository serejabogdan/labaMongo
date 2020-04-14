<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
include('../connection.php');

if (isset($_GET['titles'])) {
    $queryParam = $_GET['titles'];
    $sql = "SELECT `ID_Lesson` as 'ID урока', `week_day` as 'День недели', `lesson_number` as 'Номер урока', `auditorium` as 'Аудитория', `disciple` as 'Дисциплина', `type` as 'Тип урока' FROM lesson l
            JOIN lesson_groups lg on l.ID_Lesson = lg.FID_Lesson2 JOIN groups g on g.ID_Groups = lg.FID_Groups where g.title = :title";
    $placeholder = 'title';
} else if (isset($_GET['teachers'])) {
    $queryParam = $_GET['teachers'];
    $sql = "SELECT `ID_Lesson` as 'ID урока', `week_day` as 'День недели', `lesson_number` as 'Номер урока', `auditorium` as 'Аудитория', `disciple` as 'Дисциплина', `type` as 'Тип урока' FROM lesson l
            JOIN lesson_teacher lt on l.ID_Lesson = lt.FID_Lesson1 JOIN teacher t on lt.FID_Teacher = t.ID_Teacher where t.name = :teacher";
    $placeholder = 'teacher';
} else if (isset($_GET['auditoriums'])) {
    $queryParam = $_GET['auditoriums'];
    $sql = "SELECT `ID_Lesson` as 'ID урока', `week_day` as 'День недели', `lesson_number` as 'Номер урока', `auditorium` as 'Аудитория', `disciple` as 'Дисциплина', `type` as 'Тип урока' FROM lesson
            where auditorium = :auditorium";
    $placeholder = 'auditorium';
}

$result = prepareQuery($dbh, $sql, $queryParam, $placeholder);
echo json_encode($result);

function prepareQuery($dbh, $sql, $param, $placeholder)
{
    $sth = $dbh->prepare($sql);
    $sth->execute(array($placeholder => $param));

    return $sth->fetchAll(PDO::FETCH_OBJ);
}
