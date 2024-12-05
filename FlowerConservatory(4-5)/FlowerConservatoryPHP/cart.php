<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flower Conservatory</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">
    <link rel="icon" href="images/icons/flower_icon.png" href="path-to-favicon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet">
<style>/* Стили для корзины */
    .cart-item-img {
        width: 100px;
        height: auto;
    }
    
    .list-group-item {
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        padding: 20px;
    }
    
    .cart-item-info {
        max-width: 60%;
    }
    
    #cartItemsContainer {
        margin-bottom: 30px;
    }
    
    #totalPrice {
        font-weight: bold;
        font-size: 1.5rem;
        text-align: right;
    }
    
    #orderForm {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #e0e0e0;
    }
    .btn-primary{margin-top: 10px;}
    </style>
</head>
<body>
  <header>
      <nav class="navbar navbar-expand-lg navbar-light ">
        <a href="index.html" class="navbar-brand right unique-text-color margin-left " >
          <img class="logo mirror-image "src="images/icons/flower_icon.png" alt="logo"> Flower Conservatory
        </a>
        <div class="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="shop.php">Магазин</a>
            </li>
            <a class="btn btn-outline-primary margin-right" id="cartBtn" href="cart.php">
              Корзина (<span id="cartCounter">0</span>)
            </a>
              
            </ul>
          </div>
        </div>
  
        </nav>
      </header>
      <hr>
      <div class="container mt-5">
        <h2>Корзина</h2>
        <div class="row">
            <!-- Секция для списка товаров в корзине -->
            <div class="col-md-7" id="cartItemsContainer">
                <div id="cartItems" class="list-group"></div>
                <h4 id="totalPrice" class="mt-3">Итого: 0 ₽</h4>
            </div>
    
            <!-- Секция для формы заказа -->
            <div class="col-md-5">
                <h3>Оформить заказ</h3>
                <form id="orderForm">
                    <div class="form-group">
                        <label for="name">Имя</label>
                        <input type="text" id="name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Эл. почта</label>
                        <input type="email" id="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="address">Адрес</label>
                        <input type="text" id="address" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Оформить заказ</button>
                </form>
            </div>
        </div>
    </div>
    
      <script src="main.js"></script>
</body>