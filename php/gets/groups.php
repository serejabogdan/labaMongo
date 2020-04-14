<?php
header('Cache-Control: no-cache, must-revalidate');
include('../connection.php');

$sql = 'SELECT DISTINCT `title` FROM groups';
$result = prepareQuery($dbh, $sql);

var_dump( $result);

foreach($result as $item) {
    echo '<option>' . $item['title'] . '</option>';
}

function prepareQuery($dbh, $sql)
{
    $sth = $dbh->prepare($sql);
    $sth->execute();

    return $sth->fetchAll(PDO::FETCH_ASSOC);
}
