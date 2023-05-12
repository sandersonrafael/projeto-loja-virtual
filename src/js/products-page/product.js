// Const Informations For Document

const taxMercadoPago = [1, 1.0459, 1.0597, 1.0733, 1.0866, 1.0996, 1.1124, 1.125, 1.1373, 1.1493, 1.1612, 1.1728];

// DB

const loadProduct = () => fetch('/src/db/products.json')
    .then(res => res.json())
    .then(products => {

        // get product by url param "url"

        const urlParam = new URL(window.location.href).searchParams.get('url');
        const product = products.filter(product => product['url-param'] === urlParam)[0];

        // if param don't exists or don't return a valid product, will redirect to a 404 page

        if (!urlParam || !product) window.location.href = '/pages/404/';

        // product images -> max 4 aditional imgs

        const mainImg = document.querySelector('.product-main-img');
        const aditionalImgs = document.querySelectorAll('.product-aditional-img');

        mainImg.innerHTML = `<img src="${product['main-img']}" alt="${product.name}">`;

        if (product['aditional-imgs'].length > 0) {

            aditionalImgs[0].innerHTML = `<img class="aditional-img" src="${product['main-img']}" alt="${product.name}">`;
            aditionalImgs[0].style.border = '2px solid #DE560B'

            for (let i in product['aditional-imgs']) {

                aditionalImgs[1 + Number(i)].innerHTML += `<img class="aditional-img" src="${product['aditional-imgs'][i]}" alt="${product.name} Imagem Adicional ${1 + Number(i)}">`;
            };

            // image view change

            for (let image of aditionalImgs) {

                image.onclick = function() {

                    mainImg.querySelector('img').src = image.querySelector('img').src;

                    // orange border to clicked image

                    for (let image of aditionalImgs) {
                        image.style.border = '2px solid transparent';
                        if (this === image) this.style.border = '2px solid #DE560B';
                    }
                };
            };
            for (let div of aditionalImgs) {
                if (div.innerHTML === '') div.style.display = 'none';
            };
        };

        if (product['aditional-imgs'].length === 0) document.querySelector('.product-aditional-imgs').style.display = 'none';

        // product name

        const productName = document.querySelector('.product-name>strong');
        productName.innerHTML = product.name;

        // product price

        const productRealPrice = document.querySelector('.product-real-price');
        const productPriceNoDiscount = document.querySelector('.product-price-no-discount');
        const productPrice12Times = document.querySelectorAll('.x-12>span')[1];

        productRealPrice.innerHTML = product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        if (product['price-no-discount'] && product['price-no-discount'] > product.price) productPriceNoDiscount.innerHTML = product['price-no-discount'].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        productPrice12Times.innerHTML = (product.price * taxMercadoPago[11] / 12).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

        // installments

        const allPaymentsTimes = document.querySelectorAll('.all-payments-table .times');
        const allPaymentsTotals = document.querySelectorAll('.all-payments-table .total');

        for (let i in allPaymentsTimes) {
            allPaymentsTotals[i].innerHTML = (product.price * taxMercadoPago[i]).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            allPaymentsTimes[i].innerHTML = (product.price * taxMercadoPago[i] / (Number(i) + 1)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        }

        // product color

        /*
        preencher com código que relaciona imagem e url, exibindo na main img a cor selecionada,
        pegando também a key do object e usando como element.style['background-color'] = `${object.key}`
        */

        // product description

        const productDescription = document.querySelector('.product-description');
        productDescription.innerHTML = product.description;
});
loadProduct();

// installment cards

const paymentCards = document.querySelector('.payment-cards');
const paymentOptionCards = document.querySelector('.all-payments-options');
paymentOptionCards.innerHTML = paymentCards.innerHTML;

// show or hide payment installments

const seePaymentOptions = document.querySelector('.x-all-installments > span');
const paymentOptions = document.querySelector('.all-payments-and-installments');
const closePaymentOptions = document.querySelector('.all-payments-close');

seePaymentOptions.onclick = () => paymentOptions.style.display = 'flex';
closePaymentOptions.onclick = () => paymentOptions.style.display = 'none';
paymentOptions.onclick = function(event) {
    if (event.target === this) {
        if (this.style.display === 'flex') this.style.display = 'none';
    }
} 

// quantity add cart

const addQuantity = document.querySelectorAll('.product-quantity *');
addQuantity[0].onclick = function() {
    if (Number(addQuantity[1].innerHTML) > 1) {
        addQuantity[1].innerHTML = Number(addQuantity[1].innerHTML) - 1;
    }
}
addQuantity[2].onclick = function() {
    addQuantity[1].innerHTML = Number(addQuantity[1].innerHTML) + 1;
}