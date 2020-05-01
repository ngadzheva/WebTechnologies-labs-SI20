<?php
  require_once "user.php";
  require_once "tokenUtility.php";

  session_start();

  header("Content-type: application/json");

  $requestURL = $_SERVER["REQUEST_URI"];

  if (preg_match("/registration$/", $requestURL)) {
    registration();
  } elseif (preg_match("/login$/", $requestURL)) {
    login();
  } elseif (preg_match("/dashboard$/", $requestURL)) {
    dashboard();
  } elseif (preg_match("/logout$/", $requestURL)) {
    logout();
  } else {
    echo json_encode(["error" => "Не е намерен такъв URL"]);
  }

  function registration() {
    $errors = [];
    $response = [];

    if ($_POST) {
      $data = json_decode($_POST["data"], true);

      $userName = testInput($data["userName"]);
      $password = testInput($data["password"]);
      $confirmPassword = testInput($data["confirmPassword"]);
      $email = testInput($data["email"]);

      if (!$userName) {
        $errors[] = "Въведете потребителско име";
      }

      if (!$password) {
        $errors[] = "Въведете парола";
      }

      if (!$confirmPassword) {
        $errors[] = "Въведете повторно парола";
      }

      if ($userName && $password && $confirmPassword) {
        if ($password != $confirmPassword) {
          $errors[] = "Двете пароли не съвпадат";
        } else {
          $user = new User($userName, $password);
          $exists = $user->userExists();

          if ($exists["exists"]) {
            $errors[] = "Потребителското име е заето";
          } else {
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            $user->createUser($passwordHash, $email);
          }
        }
      }
    } else {
      $erros[] = "Грешна заявка";
    }

    if ($errors) {
      $response = ["success" => false, "data" => $errors];
    } else {
      $response = ["success" => true];
    }

    echo json_encode($response);
  }

  function login() {
    $errors = [];
    $response = [];

    if($_POST) {
      $data = json_decode($_POST["data"], true);

      $userName = testInput($data["userName"]);
      $password = testInput($data["password"]);
      $remember = $data["remember"];

      if (!$userName) {
        $errors[] = "Въведете потребителско име";
      }

      if (!$password) {
        $errors[] = "Въведете парола";
      }

      if ($userName && $password) {
        $user = new User($userName, $password);
        $isValid = $user->isValid();

        if($isValid["success"]) {
          $_SESSION["userName"] = $userName;
          $_SESSION["password"] = $user->getPassword();

          if ($remember) {
            $tokenUtility = new TokenUtility();
            $token = bin2hex(random_bytes(8));
            $expires = time() + 60 * 30 * 24 * 60;
            setcookie("token", $token, $expires, "/");
            $tokenUtility->createToken($token, $user->getUserId(), $expires);
          }
        } else {
          $errors[] = $isValid["error"];
        }
      }
    } else {
      $erros[] = "Грешна заявка";
    }

    if ($errors) {
      $response = ["success" => false, "data" => $errors];
    } else {
      $response = ["success" => true];
    }

    echo json_encode($response);
  }

  function dashboard() {
    $response = [];

    if ($_SESSION) {
      if ($_SESSION["userName"]) {
        $response = ["success" => true, "data" => $_SESSION["userName"]];
      } else {
        $response = ["success" => false, "data" => "Неоторизиран достъп"];
      }
    } else {
      if (isset($_COOKIE["token"])) {
        $tokenUtility = new TokenUtility();
        $isValid = $tokenUtility->checkToken($_COOKIE["token"]);

        if ($isValid["success"]) {
          $_SESSION["userName"] = $isValid["user"]->getUsername();
          $_SESSION["password"] = $isValid["user"]->getPassword();

          $response = ["success" => true, "data" => $_SESSION["userName"]];
        } else {
          $response = ["success" => false, "data" => $isValid["error"]];
        }
      } else {
        $response = ["success" => false, "data" => "Вашата сесия е изтекла"];
      }
    }

    echo json_encode($response);
  }

  function logout() {
    if ($_SESSION) {
      session_unset();
      session_destroy();

      setcookie("token", "", time() - 60 * 30, "/");

      echo json_encode(["success" => true]);
    } else {
      echo json_encode(["success" => false]);
    }
  }

  function testInput($input) {
    $input = trim($input);
    $input = htmlspecialchars($input);
    $input = stripslashes($input);

    return $input;
  }
?>
