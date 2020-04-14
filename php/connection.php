<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=iteh2lb1var2', 'root', '');
} catch (PDOException $e) {
    exit($e->getMessage());
}
