<?php
    require_once "user.php";
    require_once "tokenUtility.php";

    /**
     * We use this script to handle user requests
     */

    /**
     * Start a session
     */
    session_start();

    /**
     * Set Content-type: application/json header, because we will work with JSON data
     */
    header("Content-type: application/json");

    /**
     * Get the requested URI
     */
    $requestUri = $_SERVER["REQUEST_URI"];

    /**
     * Check the requested route and exeute appropriate actions
     */
    if(preg_match("/login$/", $requestUri)){
        login();
    } elseif(preg_match("/registration$/", $requestUri)) {
        registration();
    }elseif(preg_match("/dashboard$/", $requestUri)) {
        dashboard();
    } elseif(preg_match("/logout$/", $requestUri)) {
        logout();
    } else {
        echo "Не е намерен такъв URL.";
    }

    /**
     * Make authorization and authentication of the user on login
     */
    function login() {
        /**
         * This array will hold the errors we found
         */
        $errors = [];

        /**
         * Check whether a POST request was made
         * If a POST request was made, we can authorize and authenticate the user
         */
        if($_POST) {
            /**
             * Decode the received data to associative array
             */
            $data = json_decode($_POST["data"], true);

            /**
             * Check whether user name and password were inputed
             */
            if(!$data["userName"]) {
                $errors[] = "Моля, въведете потребителско име.";
            }

            if(!$data["password"]) {
                $errors[] = "Моля, въведете парола.";
            }

            /**
             * If the user name and password were inputed we can validate them
             */
            if($data["userName"] && $data["password"]) {
                $user = new User($data["userName"], $data["password"]);
                $isValid = $user->isValid();

                /**
                 * If the inputed user name and password were valid, we can store the to the session
                 */
                if($isValid["success"]){
                    $_SESSION["userName"] = $user->getUsername();
                    $_SESSION["password"] = $user->getPassword();

                    if($data["remember"]) {
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

            $response;

            if($errors) {
                $response = ["success" => false, "data" => $errors];
            } else {
                $response = ["success" => true];
            }

            /**
             * Return response to the user
             */
            echo json_encode($response);
        } else {
            echo "Грешка...";
        }
    }

    function registration() {
         /**
         * This array will hold the errors we found
         */
        $errors = [];

        /**
         * Check whether a POST request was made
         * If a POST request was made, we can authorize and authenticate the user
         */
        if($_POST) {
            /**
             * Decode the received data to associative array
             */
            $data = json_decode($_POST["data"], true);

            /**
             * Check whether user name and password were inputed
             */
            if(!$data["userName"]) {
                $errors[] = "Моля, въведете потребителско име.";
            }

            if(!$data["password"]) {
                $errors[] = "Моля, въведете парола.";
            }

            if(!$data["confirmPassword"]) {
                $errors[] = "Моля, потвърдете паролата.";
            }

            /**
             * If the user name and password were inputed we can validate them
             */
            if($data["userName"] && $data["password"] && $data["confirmPassword"]) {
                if($data["confirmPassword"] !== $data["password"]) {
                    $errors[] = "Двете пароли не съвпадат";
                } else {
                    $user = new User($data["userName"], $data["password"]);
                    $exists = $user->userExists();

                    if($exists["exists"]){
                        $errors[] = "Потребителското име е заето";
                    } else {
                        $passwordHash = password_hash($data["password"], PASSWORD_DEFAULT);
                        $user->createUser($passwordHash, $data["email"]);
                    }
                }
            }

            $response;

            if($errors) {
                $response = ["success" => false, "data" => $errors];
            } else {
                $response = ["success" => true];
            }

            /**
             * Return response to the user
             */
            echo json_encode($response);
        } else {
            echo "Грешка...";
        }
    }

    /**
     * Get the data needed for the user's dashboard
     */
    function dashboard() {
        $response = [];
        /**
         * Check whether a session was created.
         * If there was no session, it might be expired.
         */
        if($_SESSION) {
            /**
             * Check whether some user is stored to the session.
             * If there is no user stored to the session, the access is unathorized.
             */
            if($_SESSION["userName"]) {
                $response = ["success" => true, "data" => $_SESSION["userName"]];
            } else {
                $response = ["success" => false, "data" => "Неоторизиран достъп."];
            }
        } else {
            if(isset($_COOKIE['token'])) {
                $tokenUtility = new TokenUtility();
                $isValid = $tokenUtility->checkToken($_COOKIE['token']);

                /**
                 * If the inputed user name and password were valid, we can store the to the session
                 */
                if($isValid["success"]){
                    $_SESSION["userName"] = $isValid["user"]->getUsername();
                    $_SESSION["password"] = $isValid["user"]->getPassword();

                    $response = ["success" => true, "data" => $_SESSION["userName"]];
                } else {
                    $response = ["success" => false, "data" => $isValid["error"]];
                }
            } else {
                $response = ["success" => false, "data" => "Вашата сесия е изтекла."];
            }
        }

        /**
         * Return response to the user.
         */
        echo json_encode($response);
    }

    /**
     * Handle user's logout, destroying the user's session
     */
    function logout() {
        if($_SESSION){
            session_unset();
            session_destroy();

            setcookie("token", "", time() - 60 * 30, "/");

            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
    }
?>
