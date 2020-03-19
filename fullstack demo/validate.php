<?php
  header("Content-type: application/json");

  $errors = [];
  $response = [];

  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode($_POST["data"], true);

    $firstName = isset($data["firstName"]) ? testInput($data["firstName"]) : "";
    $lastName = isset($data["lastName"]) ? testInput($data["lastName"]) : "";
    $fn = isset($data["fn"]) ? testInput($data["fn"]) : 0;
    $mark = isset($data["mark"]) ? testInput($data["mark"]) : 0;

    if (!$firstName) {
      $errors[] = "Please enter First Name.";
    } elseif (mb_strlen($firstName) > 30) {
      $errors[] = "First Name can not be longer than 30 symbols";
    } else {
      $response["firstName"] = $firstName;
    }

    if (!$lastName) {
      $errors[] = "Please enter Last Name.";
    } elseif (mb_strlen($lastName) > 30) {
      $errors[] = "Last Name can not be longer than 30 symbols";
    } else {
      $response["lastName"] = $lastName;
    }

    if (!$fn) {
      $errors[] = "Please enter Faculty Number.";
    } elseif(!ctype_digit($fn)) {
      $errors[] = "Faculty Number must be integer";
    } elseif(intval($fn) < 62000 || intval($fn) > 62999) {
      $errors[] = "Faculty Number must be between 62000 and 62999";
    } else {
      $response["fn"] =  $fn;
    }

    if (!$mark) {
      $errors[] = "Please enter Mark.";
    } elseif(!is_numeric($mark)) {
      $errors[] = "Mark must be a number";
    } elseif(floatval($mark) < 2.00 || floatval($mark) > 6.00) {
      $errors[] = "Mark must be between 62000 and 62999";
    } else {
      $response["mark"] =  $mark;
    }
  } else {
    $errors[] = "Invalid request type";
  }

  if ($errors) {
    http_response_code(400);

    echo json_encode($errors);
  } else {
    http_response_code(200);

    echo json_encode($response);
  }

  function testInput($input) {
    $input = trim($input);
    $input = htmlspecialchars($input);
    $input = stripslashes($input);

    return $input;
  }
?>
