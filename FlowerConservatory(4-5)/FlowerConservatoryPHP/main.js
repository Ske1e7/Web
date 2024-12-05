var Flowers;

document.addEventListener("DOMContentLoaded", function() {
    // AJAX запрос к PHP скрипту
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Парсинг JSON данных и сохранение их в JavaScript массиве
            console.log(xhr)
            Flowers = JSON.parse(xhr.responseText);
            console.log(Flowers);
            if (window.location.href.match("shop")){
                // Отображаем все цветы
                displayFlowers(Flowers);
            
                // Поиск
                searchInput.addEventListener('input', function() {
                    const searchQuery = searchInput.value.toLowerCase();
                    const filteredFlowers = Flowers.filter(flower => flower.title.toLowerCase().includes(searchQuery) || flower.description.toLowerCase().includes(searchQuery));
                    displayFlowers(filteredFlowers);
                    
                });
            } else if(window.location.href.match("item")){
                const params = new URLSearchParams(window.location.search);
                const flowerIndex = params.get('index');
            
                    // Проверка наличия индекса и получение данных цветов
                if (flowerIndex !== null && Flowers[flowerIndex]) {
                    const flower = Flowers[flowerIndex];
                    
                    // Разметка для вывода данных о цветах
                    const detailsContainer = document.getElementById('flower-details');
                    const detailsHTML = `
                        <div class="container mt-5">
                <div class="flower-card">
                    <div class="flower-header">
                        <h1>${flower.title}</h1>
                    </div>
                    <div class="flower-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${flower.image}" class="img-fluid" alt="${flower.title}">
                            </div>
                            <div class="col-md-8">
                                <p class="description"><strong>Описание:</strong> ${flower.description}</p>
                                <table class="table">
                                    <tr>
                                        <td><strong>Размер букета:</strong></td>
                                        <td>${flower.info.bsize}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Размер цветов:</strong></td>
                                        <td>${flower.info.fsize}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Продолжительность жизни:</strong></td>
                                        <td>${flower.info.lduration}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <p><strong>Цена:</strong> <span class="priceMain">${flower.price} ₽</span></p>
                                <p><strong>Скидка:</strong> <span class="discount">${flower.discount}%</span></p>
                            </div>
                            <div class="col-md-6 text-right">
                                <button class="btn btn-success" id="addToCartBtn">В корзину</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    `;
                    detailsContainer.innerHTML = detailsHTML;
                        // Добавляем обработчик для кнопки "В корзину"
                document.getElementById('addToCartBtn').addEventListener('click', () => addToCart(flower));
                } else {
                    // Если индекс не найден, выводим сообщение
                    document.getElementById('flower-details').innerHTML = '<p>Букет не найден</p>';
                }
            };
        };
    };
    xhr.open("GET", "ajax.php", true);
    xhr.send();
});
const flowersContainer = document.getElementById('flowersContainer');
const searchInput = document.getElementById('searchInput');
    
        // Функция для генерации карточек динамически
    function displayFlowers(flowersArray) {
        flowersContainer.innerHTML = ''; 
        flowersArray.forEach((flower, index) => {
            const discountPrice = flower.price * (1 - flower.discount / 100);
            const flowerCard = `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <img src="${flower.image}" class="card-img-top" alt="${flower.title}">
                        <div class="card-body">
                            <h5 class="card-title">${flower.title}</h5>
                            
                            <p><strong>Размер букета:</strong> ${flower.info.bsize}</p>
                            <p><strong>Цена:</strong> <del>${flower.price} ₽</del> <span class="text-danger">${discountPrice.toFixed(2)} ₽</span> (${flower.discount}% скидка)</p>
                            <a href="item.php?index=${index}" class="btn btn-primary">Подробнее</a>
                        </div>
                    </div>
                </div>
            `;
            flowersContainer.innerHTML += flowerCard;
            });
        }
        



// Инициализация локальной корзины, если она не существует
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Функция добавления цветов в корзину
function addToCart(flower) {
    let cart = JSON.parse(localStorage.getItem('cart'));  // Получаем корзину
    
    cart.push(flower);  // Добавляем выбранный букет
    localStorage.setItem('cart', JSON.stringify(cart));  // Сохраняем корзину в localStorage
    updateCartCounter();  // Обновляем счетчик
    
}

// Функция для обновления счетчика корзины
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    document.getElementById('cartCounter').textContent = cart.length;
}
updateCartCounter();

// Получение товаров из localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    let total = 0;

    cartItemsContainer.innerHTML = '';  // Очищаем контейнер перед загрузкой

    // Генерация списка товаров в корзине
    cart.forEach((flower, index) => {
        const flowerHTML = `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${flower.image}" class="card-img" alt="${flower.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${flower.title}</h5>
                            <p class="card-text">Цена: ${flower.price} ₽</p>
                            <p class="card-text">Скидка: ${flower.discount}%</p>
                            <button class="btn btn-danger" onclick="removeFromCart(${index})">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += flowerHTML;
        total += flower.price - (flower.price / 100 * flower.discount) ;
    });

    // Обновляем итоговую сумму
    document.getElementById('totalPrice').textContent = `Итого: ${total.toFixed(2)} ₽`;
}

// Функция удаления товара из корзины
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);  // Удаляем букет по индексу
    localStorage.setItem('cart', JSON.stringify(cart));  // Сохраняем обновленную корзину
    loadCart();  // Обновляем отображение корзины
    updateCartCounter();  // Обновляем счетчик корзины
}

// Функция обновления счетчика корзины
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartCounter').textContent = cart.length;
}

// Обработка формы заказа
document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length == 0) {
        alert("Добавьте в корзину хотя бы один букет")
    } else{
    // Получаем данные формы
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const formData = new FormData;
    cart.forEach(flower => {
        console.log(flower)
        formData.append('flowers[]', flower.id);    
    });
        formData.append('name', name);
        formData.append('email', email);
        formData.append('address', address);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "order.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                for (const pair of formData.entries()) {
                    console.log(pair[0] + ': ' + pair[1]);
                }
                alert(`Спасибо за ваш заказ, ${name}!`);
                
                // Очищаем корзину после заказа
                localStorage.removeItem('cart');
                loadCart();  // Обновляем корзину после очистки
                updateCartCounter();  // Обновляем счетчик корзины
    
            }
        };
        xhr.send(formData);
    console.log(`Имя: ${name}, Эл. почта: ${email}, Адрес: ${address} Заказано: `);
    


    cart.forEach((flower, index) => {
        console.log(`${index} : ${flower.title}, ${flower.price}, ${flower.discount}`)
    });
    
    


    
    }
});

// Загружаем корзину при загрузке страницы
loadCart();
updateCartCounter();