<?php
  require_once 'classes.php';

  class Student extends User {
    private $firstName;
    private $lastName;
    private $fn;

    public function __construct($userName, $password, $firstName, $lastName, $fn) {
      parent::__construct($userName, $password);

      $this->firstName = $firstName;
      $this->lastName = $lastName;
      $this->fn = $fn;
    }

    public function getStudentInfo() {
      return parent::getUsername() . ": " . $this->firstName . " " . $this->lastName;
    }
  }

  $student = new Student("asdf", "sdakjd", "name", "lastName", 62000);
  echo $student->getStudentInfo();
?>
