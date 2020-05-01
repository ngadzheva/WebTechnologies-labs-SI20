<?php
    require_once "db.php";

    /**
     * Use this class to manage a given user
     * Only this class will have direct access to user's data
     */
    class User {
        private $userName;
        private $password;
        private $email;
        private $userId;

        /**
         * This is an object of type Database, which we will use to make queries to the DB
         */
        private $db;

        public function __construct($userName, $password) {
            $this->userName = $userName;
            $this->password = $password;
            $this->db = new Database();
        }

        /**
         * Validate user's data
         * Check whether there is such a user in the DB and whether his password is correct
         */
        public function isValid() {
            /**
             * Call the Database method selectUserQuery with associative array holding the user name of the user
             * The variable $query holds an associative array with the result of the execution of selectUserQuery()
             */
            $query = $this->db->selectUserQuery(array("user" => $this->userName));

            /**
             * If the query was executed successfully we can validate the user's data
             */
            if($query["success"]) {
                /**
                 * $query["data"] holds a PDO object with the result of the executed query.
                 * We can get the data from the returned result as associative array, calling
                 * the fetch(PDO::FETCH_ASSOC) method on $query["data"].
                 */
                $user = $query["data"]->fetch(PDO::FETCH_ASSOC);

                /**
                 * If there wasn't found a user with the given user name the $variable $user will be null
                 */
                if($user) {
                    /**
                     * We check whether the inputed from the user password is correct, using password_verify()
                     */
                    if(password_verify($this->password, $user["password"])) {
                        $this->password = $user["password"];
                        $this->email = $user["email"];
                        $this->userId = $user["id"];

                        return array("success" => true);
                    } else {
                        return array("success" => false, "error" => "Грешна парола.");
                    }
                } else {
                    return array("success" => false, "error" => "Грешно потребителско име.");
                }
            } else {
                return array("success" => false, "error" => $query["error"]);
            }
        }

        /**
         * Check whether a user with the given username already exists
         */
        public function userExists() {
            $query = $this->db->selectUserQuery(array("user" => $this->userName));

            /**
             * If the query was executed successfully we can check whether the user exists
             */
            if($query["success"]) {
                /**
                 * $query["data"] holds a PDO object with the result of the executed query.
                 * We can get the data from the returned result as associative array, calling
                 * the fetch(PDO::FETCH_ASSOC) method on $query["data"].
                 */
                $user = $query["data"]->fetch(PDO::FETCH_ASSOC);

                /**
                 * If there wasn't found a user with the given user name the variable $user will be null
                 */
                if($user) {
                    return array("exists" => true);
                } else {
                    return array("exists" => false);
                }
            } else {
                return array("success" => false, "error" => $query["error"]);
            }
        }

        /**
         * Get the user name of the user
         */
        public function getUsername() {
            return $this->userName;
        }

        /**
         * Get the user id of the user
         */
        public function getUserId() {
            return $this->userId;
        }

        /**
         * Get the password of the user
         */
        public function getPassword() {
            return $this->password;
        }

        /**
         * Get the email of the user
         */
        public function getEmail() {
            return $this->email;
        }

        /**
         * Set user email
         */
        public function setEmail($email) {
            return $this->email = $email;
        }

        /**
         * Update the user's info
         */
        public function updateUserInfo($userName, $password, $email) {
            /**
             * We create a hash to the user's new password, because we don't want to store plain text passwords
             */
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            /**
             * Call the Database method updateUserQuery with associative array holding the new data of the user
             */
            $query = $this->db->updateUserQuery(array("username" => $userName, "password" => $passwordHash, "email" => $email, "user" => $this->userName));

            /**
             * If the query was executed successfully we can update the user's data
             */
            if($qeury["success"]) {
                $this->userName = $userName;
                $this->password = $passwordHash;
                $this->email = $email;

                return array("success" => true);
            } else {
                return array("success" => false, "error" => $query["error"]);
            }
        }

        /**
         * Insert new user to the DB
         */
        public function createUser($password, $email) {
            /**
             * Call the Database method updateUserQuery with associative array holding the new data of the user
             */
            $query = $this->db->insertUserQuery(array("user" => $this->userName, "password" => $password, "email" => $email));

            /**
             * If the query was executed successfully we can initialize the user's data
             */
            if($query["success"]) {
                $this->password = $password;
                $this->email = $email;

                return array("success" => true);
            } else {
                return array("success" => false, "error" => $query["error"]);
            }
        }
    }
?>
