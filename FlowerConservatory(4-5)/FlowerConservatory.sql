-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 24 2024 г., 17:28
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `FlowerConservatory`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Flower`
--

CREATE TABLE `Flower` (
  `id` int NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `infoId` int NOT NULL,
  `price` int NOT NULL,
  `discount` int NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `flower`
--

INSERT INTO `Flower` (`id`, `title`, `description`, `infoId`, `price`, `discount`, `image`) VALUES
(1, 'Букет Васильков', 'Букет васильков - это изящная композиция, которая обязательно понравится всем любителям цветов.\r\n', 1,  4490, 15, 'images/flowers/cornflower.png'),
(2, 'Букет Ромашек', 'Букет ромашек отлично подходит как для пышного торжества, так и для уютных поздравлений в узком кругу.\r\n', 2, 5999, 20, 'images/flowers/daisies.png'),
(3, 'Букет Красных Роз', 'Классический букет из красных розы – беспроигрышный вариант для любого праздника.\r\n', 3, 6499, 30, 'images/flowers/rose.png'),
(4, "Букет Ирисов", "Букет ирисов - это милый и незабываемый подарок. Очень красиво смотрится в высокой вазе, любители минимализма оценят.", 4, 5049, 10, "images/flowers/iris.png"),
(5, "Букет Лилий", "Букет лилий - изысканное сочетание цветов, которое создаст атмосферу тепла и душевного равновесия.", 5, 3999, 10, "images/flowers/lily.png"),
(6, "Букет Пионов", "Прекрасный букет из ярких коралловых пионов с очень интересным раскрытием бутона.", 6, 14000, 25, "images/flowers/pion.png"),
(7, "Букет Гортензий", "Букет состоит из гортензий, которые занимают особое место в сердцах многих ценителей цветов.", 7, 12000, 15, "images/flowers/hydrangea.png"),
(8, "Букет подсолнухов", "Букет Подсолнухов является ярким, красивым и прекрасным подарком для тех, кто любит цветы.", 8, 10000, 20, "images/flowers/sunflower.png"),
(9, "Букет Тюльпанов", "Букет тюльпанов прекрасный подарок, если вы ищете нечто особенное, ароматное, вдохновляющее", 9, 2000, 5, "images/flowers/tulip.png");


-- --------------------------------------------------------

--
-- Структура таблицы `flowerOrder`
--

CREATE TABLE `flowerOrder` (
  `id` int NOT NULL,
  `flowerId` int NOT NULL,
  `orderId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `info`
--

CREATE TABLE `info` (
  `id` int NOT NULL,
  `bsize` text NOT NULL,
  `fsize` text NOT NULL,
  `lduration` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `info`
--

INSERT INTO `info` (`id`, `bsize`, `fsize`, `lduration`) VALUES
(1, 'Большой', 'Маленький', '7-10 дней'),
(2, 'Средний', 'Маленький', '4-7 дней'),
(3, 'Маленький', 'Средний', '7-10 дней'),
(4, 'Средний', 'Средний', '5-10 дней'),
(5, 'Маленький', 'Большой', '5-10 дней'),
(6, 'Средний', 'Большой', '4-7 дней'),
(7, 'Большой', 'Большой', '21-28 дней'),
(8, 'Средний', 'Маленький', '7-10 дней'),
(9, 'Большой', 'Большой', '3-7 дней');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user` text NOT NULL,
  `email` text NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Flower`
--
ALTER TABLE `Flower`
  ADD PRIMARY KEY (`id`),
  ADD KEY `infoId` (`infoId`);

--
-- Индексы таблицы `flowerOrder`
--
ALTER TABLE `flowerOrder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flowerId` (`flowerId`),
  ADD KEY `orderId` (`orderId`);

--
-- Индексы таблицы `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Flower`
--
ALTER TABLE `Flower`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `flowerOrder`
--
ALTER TABLE `flowerOrder`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `info`
--
ALTER TABLE `info`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Flower`
--
ALTER TABLE `Flower`
  ADD CONSTRAINT `flower_ibfk_1` FOREIGN KEY (`infoId`) REFERENCES `info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `flowerOrder`
--
ALTER TABLE `flowerOrder`
  ADD CONSTRAINT `flowerorder_ibfk_1` FOREIGN KEY (`flowerId`) REFERENCES `Flower` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `flowerorder_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
