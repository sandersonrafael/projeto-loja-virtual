// DB - seção temporária

const product = {
    "id": 1,
    "name": "Prancha de Skate Santa Cruz Ryb Color",
    "description": "<p>Apresentamos a Prancha de Skate Ryb Color da marca Santa Cruz, uma peça de qualidade superior e design impressionante. Com dimensões de 80cm x 31,5cm, esta prancha é construída com corpo em madeira Maple, garantindo a durabilidade e resistência necessárias para o uso intenso no skate.</p><p>O modelo Ryb Color apresenta uma combinação de cores vibrantes, incluindo vermelho, azul, amarelo e preto, que se destacam e chamam a atenção em qualquer pista de skate. A prancha também conta com a marca da Santa Cruz em destaque, garantindo a autenticidade do produto.</p><p>Se você está procurando uma prancha de skate de alta qualidade, resistente e com um design único e marcante, a Ryb Color da Santa Cruz é a escolha perfeita para você. Prepare-se para conquistar novos desafios e se destacar na pista com esta incrível prancha de skate.</p>",
    "price": 124.90,
    "price-no-discount": 144.9,
    "main-img": "/src/img/products/prancha-de-skate-santa-cruz-ryb-color/main-image.jpeg",
    "aditional-imgs": [
        "/src/img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-1.jpeg",
        "/src/img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-2.jpeg",
        "/src/img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-3.jpeg",
        "/src/img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-4.jpeg",
        "/src/img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-5.jpeg"
    ],
    "colors": [],
    "availability": 34,
    "collection": "pranchas",
    "brand": "Santa Cruz"
}

// Const Informations For Document

const taxMercadoPago = [1, 1.0459, 1.0597, 1.0733, 1.0866, 1.0996, 1.1124, 1.125, 1.1373, 1.1493, 1.1612, 1.1728]



// Dados Temporários Que Serão Obtidos Por Json

const mainImg = document.querySelector('.product-main-img');
const aditionalImgs = document.querySelector('.product-aditional-imgs');

mainImg.innerHTML = '<img src="/src/img/products/prancha-de-skate-santa-cruz-ryb-color/main-image.jpeg" alt="Prancha de Skate Ryb Color">'
aditionalImgs.innerHTML = '<div class="product-aditional-img"><img class="aditional-img" src="/src/img/products/prancha-de-skate-santa-cruz-ryb-color/main-image.jpeg" alt=""></div>';
aditionalImgs.innerHTML += '<div class="product-aditional-img"><img src="/src/img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-1.jpeg" class="aditional-img"></div><div class="product-aditional-img"><img src="/src/img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-2.jpeg" class="aditional-img"></div><div class="product-aditional-img"><img src="/src/img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-3.jpeg" class="aditional-img"></div><div class="product-aditional-img"><img src="/src/img/products/prancha-de-skate-santa-cruz-ryb-color/aditional-image-4.jpeg" class="aditional-img"></div>';


// reaproveitar depois -> IMPORTANTE!!!

const aditionalImg = document.querySelectorAll('.product-aditional-img');

if (aditionalImg.length === 1) {
    aditionalImgs.style.display = 'none';
} else if (aditionalImg.length > 1 && aditionalImg.length <= 4) {
    aditionalImgs.style['justify-content'] = 'center';
}



// installments
const paymentCards = document.querySelector('.payment-cards');
const paymentOptionCards = document.querySelector('.all-payments-options');
paymentOptionCards.innerHTML = paymentCards.innerHTML;

const allPaymentsTimes = document.querySelectorAll('.all-payments-table .times')
const allPaymentsTotals = document.querySelectorAll('.all-payments-table .total')

for (let i in allPaymentsTimes) {
    allPaymentsTotals[i].innerHTML = (product.price * taxMercadoPago[i]).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    allPaymentsTimes[i].innerHTML = (product.price * taxMercadoPago[i] / (Number(i) + 1)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}


const seePaymentOptions = document.querySelector('.x-all-installments > span');
const paymentOptions = document.querySelector('.all-payments-and-installments');
const closePaymentOptions = document.querySelector('.all-payments-close');




seePaymentOptions.onclick = () => paymentOptions.style.display = 'flex';
closePaymentOptions.onclick = () => paymentOptions.style.display = 'none';



// quantity add cart

const addQuantity = document.querySelectorAll('.product-quantity *');
addQuantity[0].onclick = function() {
    if (Number(addQuantity[1].innerHTML) > 1) {
        addQuantity[1].innerHTML = Number(addQuantity[1].innerHTML) - 1
    }
}
addQuantity[2].onclick = function() {
    addQuantity[1].innerHTML = Number(addQuantity[1].innerHTML) + 1
}