<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "FlowerConservatory";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if(!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}
// Получение данных из POST запроса
$name = $_POST['name'];
$email = $_POST['email'];
$address = $_POST['address'];
$flowers = $_POST['flowers']; // Массив игр, заказанных пользователем

// Создание нового заказа в таблице Orders
$sql = "INSERT INTO Orders (User, Email, Address) VALUES ('$name', '$email', '$address')";
if ($conn->query($sql) === TRUE) {
  $orderId = $conn->insert_id; // Получение ID только что созданного заказа
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Добавление информации об играх в таблицу flowerOrder
foreach($flowers as $flowerId) {
  $sql = "INSERT INTO flowerOrder (flowerId, orderId) VALUES ('$flowerId', '$orderId')";
  if ($conn->query($sql) !== TRUE) {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();

?>