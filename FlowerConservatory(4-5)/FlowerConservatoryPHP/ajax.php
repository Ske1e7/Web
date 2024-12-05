<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "FlowerConservatory";

// Подключение к базе данных
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Ошибка подключения: " . mysqli_connect_error());
}

// SQL-запрос для выборки данных из таблиц flowers и info с объединением
$sql = "SELECT f.id, f.title, f.description, f.price, f.discount, f.image, 
               i.bsize, i.fsize, i.lduration
        FROM Flower f 
        JOIN info i ON f.infoId = i.id";

$result = mysqli_query($conn, $sql);

// Проверка на ошибки выполнения запроса
if (!$result) {
    die("Ошибка выполнения запроса: " . mysqli_error($conn));
}

// Преобразование данных в массив PHP
$data = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        // Вложенный объект info
        $info = array(
            "bsize" => $row['bsize'],
            "fsize" => $row['fsize'],
            "lduration" => $row['lduration']
        );

        // Добавляем игру с вложенным info
        $data[] = array(
            "title" => $row['title'],
            "description" => $row['description'],
            "info" => $info,
            "price" => $row['price'],
            "discount" => $row['discount'],
            "image" => $row['image'],
            "id" => $row['id'] // пример, можно изменить или добавить еще одно поле в БД
        );
    }
}

// Закрытие соединения с базой данных
mysqli_close($conn);

// Преобразование массива данных в формат JSON и вывод на экран
echo json_encode($data);

?>
