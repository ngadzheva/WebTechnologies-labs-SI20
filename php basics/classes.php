<?php
  class User {
    private $userName;
    private $password;

    public function __construct($userName, $password) {
      $this->userName = $userName;
      $this->password = $password;
    }

    public function setUserName($userName) {
      $this->userName = $userName;
    }

    public function getUsername() {
      return $this->userName;
    }
  }

  $user = new User("ivgerves", "pass");
  echo $user->getUsername();
?>
