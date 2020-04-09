<?php
    $host = "localhost";
    $username = "root";
    $pass = "";
    $dbname = "www";

    try {
        $connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $pass,
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

        $sql = "CREATE TABLE student(
            fn INT(6) UNSIGNED NOT NULL,
            userID INT NOT NULL,
            firstName VARCHAR(30) NOT NULL,
            lastName VARCHAR(30) NOT NULL,
            PRIMARY KEY (fn),
            FOREIGN KEY(userID) REFERENCES users(id) ON UPDATE CASCADE
        )";
        $connection->exec($sql);

        $sql = "INSERT INTO student(fn, userID, firstName, lastName) VALUES (62333, 1, 'Ivan', 'Ivanov')";
        $sql = "INSERT INTO users(username, password, email) VALUES ('user1', 'djajd444$$%&*l;', 'email')";
        $sql = "INSERT INTO student(fn, userID, firstName, lastName) VALUES (62334, 2, 'Georgi', 'Ivanov')";

        $sql = "SELECT * FROM student";
        $result = $connection->query($sql);

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            echo $row["fn"] . ": " . $row["firstName"] . " " . $row["lastName"] . "<br/>";
        }

        $sql = "UPDATE student SET fn = ? WHERE firstName = ? AND lastName = ?";
        $statement = $connection->prepare($sql);
        $statement->execute([62445, "Georgi", "Ivanov"]);

        $sql = "UPDATE student SET fn = :fn WHERE firstName = :firstName AND lastName = :lastName";
        $statement = $connection->prepare($sql);
        $statement->execute(["fn" => 612444, "firstName" => "Ivan", "lastName" => "Ivanov"]);

        // $statement->bindParam(":fn", $fn);
        // $fn = 62555;
        // $statement->bindValue(":fn", $fn);

        $sqlStudent = "INSERT INTO student(fn, userID, firstName, lastName) VALUES (:fn, :userID, :firstName, :lastName)";

        $students = [
            ["fn" => 62232, "userID" => 3, "firstName" => "StudentName", "lastName" => "StudentLastName"],
            ["fn" => 62252, "userID" => 4, "firstName" => "StudentName", "lastName" => "StudentLastName"],
            ["fn" => 62242, "userID" => 5, "firstName" => "StudentName", "lastName" => "StudentLastName"],
            ["fn" => 62282, "userID" => 6, "firstName" => "StudentName", "lastName" => "StudentLastName"]
        ];

        $sqlUsers = "INSERT INTO users(username, password, email) VALUES (:username, :password, :email)";

        $users = [
            ["username" => "user2", "password" => "dslkdlkl", "email" => "email"],
            ["username" => "user3", "password" => "dslkdlkl", "email" => "email"],
            ["username" => "user4", "password" => "dslkdlkl", "email" => "email"],
            ["username" => "user5", "password" => "dslkdlkl", "email" => "email"]
        ];

        $connection->beginTransaction();
        // INSERT
        // UPDATE
        // Some other query
        $usersStatement = $connection->prepare($sqlUsers);
        foreach($users as $value) {
            $usersStatement->execute($value);
        }

        $studentStatement = $connection->prepare($sqlStudent);

        foreach($students as $value) {
            $studentStatement->execute($value);
        }
        $connection->commit();


    } catch(PDOException $error) {
        $connection->rollBack();
        echo $error->getMessage();
    }
?>
