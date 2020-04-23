<?php
    //require_once "../config/config.php";

    /**
     * Use this class to work with a database
     * Only this class will have direct access to the database
     */
    class Database {
        /**
         * This is a PDO object, which holds the connection to the DB
         */
        private $connection;

        /**
         * These are prepared statements
         */
        private $insertUser;
        private $updateUser;
        private $selectUser;
        private $insertToken;
        private $selectToken;
        private $selectUserById;

        public function __construct(){
            $config = parse_ini_file("../config/config.ini", true);

            $host = $config['db']['host'];
            $dbname = $config['db']['name'];
            $user = $config['db']['user'];
            $password = $config['db']['password'];

            $this->init($host, $dbname, $user, $password);
        }

        /**
         * Create connection to the database on given host, database name, user name and password
         * Then create some prepared statements, which we will use frequently
         */
        private function init($host, $database, $userName, $password) {
            try {
                $this->connection = new PDO("mysql:host=$host;dbname=$database", $userName, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                $this->prepareStatements();
            } catch(PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }

        /**
         * Create some prepared statements, which we will use frequently
         */
        private function prepareStatements() {
            $sql = "INSERT INTO users(username, password, email) VALUES (:user, :password, :email)";
            $this->insertUser = $this->connection->prepare($sql);

            $sql = "UPDATE users SET username=:userName, password=:password, email=:email WHERE username=:user";
            $this->updateUser = $this->connection->prepare($sql);

            $sql = "SELECT * FROM users WHERE username=:user";
            $this->selectUser = $this->connection->prepare($sql);

            $sql = "SELECT * FROM users WHERE id=:id";
            $this->selectUserById = $this->connection->prepare($sql);

            $sql = "INSERT INTO tokens(token, user_id, expires) VALUES (:token, :user_id, :expires)";
            $this->insertToken = $this->connection->prepare($sql);

            $sql = "SELECT * FROM tokens WHERE token=:token";
            $this->selectToken = $this->connection->prepare($sql);
        }

        /**
         * We use this method to execute queries for inserting user
         * We only execute the created prepared statement for inserting user in DB with new database
         */
        public function insertUserQuery($data) {
            try{
                $this->insertUser->execute($data);

                return array("success" => true);
            } catch(PDOException $e){
                $this->connection->rollBack();
                echo "Connection failed: " . $e->getMessage();
                return array("success" => false, "error" => $e->getMessage());
            }
        }

        /**
         * We use this method to execute queries for updating user data
         * We only execute the created prepared statement for updating user in DB with new database
         * We use transaction, because we may have more than one elements in the $data array
         */
        public function updateUserQuery($data) {
            try{
                $this->connection->beginTransaction();

                foreach($data as $value) {
                    $this->updateUser->execute($value);
                }

                $this->connection->commit();

                return array("success" => true);
            } catch(PDOException $e){
                $this->connection->rollBack();
                echo "Connection failed: " . $e->getMessage();
                return array("success" => false, "error" => $e->getMessage());
            }
        }

        /**
         * We use this method to execute queries for getting user data by username
         * We only execute the created prepared statement for selecting user in DB with new database
         * If the query was executed successfully, we return the result of the executed query
         */
        public function selectUserQuery($data) {
            try{
                $this->selectUser->execute($data);

                return array("success" => true, "data" => $this->selectUser);
            } catch(PDOException $e){
                echo "Connection failed: " . $e->getMessage();

                return array("success" => false, "error" => $e->getMessage());
            }
        }

        /**
         * We use this method to execute queries for getting user data by user id
         * We only execute the created prepared statement for selecting user in DB with new database
         * If the query was executed successfully, we return the result of the executed query
         */
        public function selectUserByIdQuery($data) {
            try{
                $this->selectUserById->execute($data);

                return array("success" => true, "data" => $this->selectUserById);
            } catch(PDOException $e){
                echo "Connection failed: " . $e->getMessage();

                return array("success" => false, "error" => $e->getMessage());
            }
        }

        /**
         * We use this method to execute queries for inserting user session token
         * We only execute the created prepared statement for inserting user in DB with new database
         */
        public function insertTokenQuery($data) {
            try{
                $this->insertToken->execute($data);

                return array("success" => true);
            } catch(PDOException $e){
                $this->connection->rollBack();
                echo "Connection failed: " . $e->getMessage();
                return array("success" => false, "error" => $e->getMessage());
            }
        }

        /**
         * We use this method to execute queries for getting user session token
         * We only execute the created prepared statement for selecting user in DB with new database
         * If the query was executed successfully, we return the result of the executed query
         */
        public function selectTokenQuery($data) {
            try{
                $this->selectToken->execute($data);

                return array("success" => true, "data" => $this->selectToken);
            } catch(PDOException $e){
                echo "Connection failed: " . $e->getMessage();

                return array("success" => false, "error" => $e->getMessage());
            }
        }

        /**
         * Close the connection to the DB
         */
        function __destruct() {
            $this->connection = null;
        }
    }
?>
