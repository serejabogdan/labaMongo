<?php
header("Content-Type: text/xml");
header("Cache-Control: no-cache, must-revalidate");
include('../connection.php');

$sql = 'SELECT DISTINCT `name` FROM teacher';
$result = prepareQuery($dbh, $sql);

echo '<?xml version="1.0" encoding="utf8" ?>';
echo "<root>";
foreach ($result as $item) {
    echo '<row>' . $item['name'] . '</row>';
}
echo "</root>";

function prepareQuery($dbh, $sql)
{
    $sth = $dbh->prepare($sql);
    $sth->execute();

    return $sth->fetchAll(PDO::FETCH_ASSOC);
}
