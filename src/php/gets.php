<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
require_once "../../vendor/autoload.php";

try {
    $mongo = new MongoDB\Client;
} catch (Exception $e) {
    exit($e->getMessage());
}

$lessons = $mongo->dblab->lessons;

if(isset($_GET['group'])) {
    $documents = $lessons->find(array('$and' => array(array('type'=> 'лабораторная'), array('groups'=> array('$in' => array($_GET['group']))))));

    printDocs($documents);
}

if(isset($_GET['teacher']) && isset($_GET['discipline'])) {
    $documents = $lessons->find(
        array('$and' => array(
            array('type'=> 'лекция'),
            array('discipline'=> $_GET['discipline']),
            array('teachers'=> array('$in' => array($_GET['teacher'])))
        ))
    );
    printDocs($documents);
}

function printDocs($documents) {
    $result = array();

    foreach($documents as $document){
        array_push($result, $document);
    }

    echo json_encode($result);
}

if(isset($_GET['auditorium'])) {
    $documents = $lessons->find();

    $result = array();

    foreach($documents as $document){
        array_push($result, $document['auditorium']);
    }

    echo json_encode($result);
}