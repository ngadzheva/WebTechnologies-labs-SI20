<?php
  $aFive = '5';
  $secondFive = "aasdf$aFive";
  $bar = "bar";

  function add() {
    global $aFive;

    $five = 5;
    return $five + $aFive;
  }

  function increment() {
    static $a = 0;

    echo $a;

    ++$a;
  }

  function greet($name = "John") {
    echo "Hello, $name!";
  }

  echo $secondFive . " " . $bar;

  increment();
  increment();
  increment();

  echo "<br/>";

  greet();
  echo "<br/>";
  greet("Jack");
  echo "<br/>";
  greet(null);

  echo "<br>";

  $arr = array();
  $arr[0] = 2;
  $arr[1] = 3;
  $arr[] = 5;

  $otherArr = array(2, 5, 8, 3);

  $ar = [3, 5, 6];

  foreach($arr as $value) {
    echo $value;
  }

  $namedArray = array("name" => "John", "age" => 22);
  $namedArray["name"];

  $secondNamedArray = ["name" => "Jack", "age" => 21];

  foreach($namedArray as $key => $value) {
    echo $key . ": " . $value;
  }

  array_push($arr, 6);
  array_unshift($arr, 9);

  echo "<br>";
  var_dump($arr);
  echo "<br>";
  print_r($arr);

  array_pop($arr);
  echo "<br>";
  print_r($arr);
  array_shift($arr);
  echo "<br>";
  print_r($arr);

  echo "<br>";
  print_r(array_slice($arr, 1, 2));

  echo "<br>";
  print_r($arr);

  echo "<br>";
  array_splice($arr, 1, 2);
  print_r($arr);
  $arr[] = 2;
  $arr[] = 9;

  echo "<br>";

  array_splice($arr, 1, 0, 8);

  print_r($arr);

  sort($arr);

  echo "<br>";
  print_r($arr);

  rsort($arr);

  $twoDimensionalArr = [
    [1, 2, 3],
    [3, 5, 8]
  ];

  $namedArr = [
    "first" => [
      "name" => "nncd",
      "age" => 21
    ],
    "second" => [
      "name" => "dksld",
      "age" => 22
    ]
  ];
?>
