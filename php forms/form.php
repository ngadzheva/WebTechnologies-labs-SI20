<?php
  if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo "This is used only for getting resources on some endpoint.";
    echo "It is not secure to use it for sending data.";
  } elseif ($_POST) {
    $username = isset($_POST["username"]) ? testInput($_POST["username"]) : "";
    $email = isset($_POST["email"]) ? testInput($_POST["email"]) : "";
    $age = isset($_POST["age"]) ? testInput($_POST["age"]) : 0;
    $gender = isset($_POST["gender"]) ? testInput($_POST["gender"]) : "Unknown";

    echo $username . " " . $email . " " . $age . " " . $gender;
  }

  function testInput($input) {
    $input = trim($input);
    $input = htmlspecialchars($input);
    $input = stripslashes($input);

    return $input;
  }
?>
