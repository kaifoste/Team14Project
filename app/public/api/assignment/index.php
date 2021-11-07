<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM assignments';
$vars = [];

if (isset($_GET['referees'])) {
    // This is an example of a parameterized query
    $sql = 'SELECT * FROM assignments WHERE refereeId = ?';
  
    //NOT THIS WAY
    // $sql = 'SELECT * FROM offer WHERE studentId = ' . $_GET['student'];
  
    $vars = [ $_GET['referees'] ];
  }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$assignments = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($assignments, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;