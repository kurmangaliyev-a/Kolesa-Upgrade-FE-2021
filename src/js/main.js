import '../scss/style.scss';

const baseUrl = 'http://api.mcdir.me/api/v1';
let cardsInfo;

document.querySelector('.header .search').addEventListener('click', (e) => {
    if (!e.target.classList.contains('search-icon')) {
        document.querySelector('.search input[type="search"]').focus();
    }
});
function changeModalInfo(id) {
    let myCard;

    cardsInfo.forEach((item) => {
        if (item.id === id) {
            myCard = item;
        }
    });
    let ballsInRus;

    if (myCard.price % 10 === 1) {
        ballsInRus = '';
    } else if (myCard.price % 10 > 0 && myCard.price % 10 < 5) {
        ballsInRus = 'a';
    } else {
        ballsInRus = 'ов';
    }

    document.querySelector('.modal__main-photo-img').src = `http://api.mcdir.me${myCard.main_photo}`;
    document.querySelector('.modal__main-photo-img').alt = myCard.name;
    document.querySelector('.modal__name').textContent = myCard.name;
    document.querySelector('.modal__details-content').textContent = myCard.description;
    document.querySelector('.modal__price').textContent = `${myCard.price} балл${ballsInRus}`;
}
function openModal(id) {
    const modal = document.querySelector('.modal');

    changeModalInfo(id);
    modal.classList.remove('modal--hide');
}
function productModalWindow() {
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');

    function closeModalEvent() {
        modal.classList.add('modal--hide');
        document.body.style.overflow = '';
    }
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            modal.classList.add('modal--hide');
            document.body.style.overflow = '';
        }
    });
    closeModal.addEventListener('click', () => {
        modal.classList.add('modal--hide');
        document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            modal.classList.add('modal--hide');
            document.body.style.overflow = '';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModalEvent();
        }
    });
}

function renderBlock(data) {
    const productsBlocks = document.querySelector('.products');

    productsBlocks.innerHTML = '';
    data.forEach((item) => {
        const product = document.createElement('div');
        const img = document.createElement('img');
        const productInfo = document.createElement('div');
        const productPrice = document.createElement('p');
        const productName = document.createElement('p');
        const productSizes = document.createElement('p');
        const productOrderDiv = document.createElement('div');
        const productOpenModal = document.createElement('button');

        product.classList.add('product');
        productInfo.classList.add('product__info');
        productPrice.classList.add('product__price');
        productName.classList.add('product__name');
        productSizes.classList.add('product__sizes');
        productOrderDiv.classList.add('product__order-div');
        productOpenModal.classList.add('product__open-modal');
        product.append(img);

        product.dataset.id = item.id;
        product.addEventListener('click', () => {
            openModal(item.id);
        });
        img.src = `http://api.mcdir.me${item.main_photo}`;
        img.width = '330';
        img.height = '330';
        img.alt = item.name;
        img.classList.add('product__mainPhoto');

        if (item.is_new === 1) {
            const newProduct = document.createElement('div');

            newProduct.classList.add('product__new-product');
            newProduct.textContent = 'NEW';
            product.append(newProduct);
        }

        product.append(productInfo);
        let ballsInRus;

        if (item.price % 10 === 1) {
            ballsInRus = '';
        } else if (item.price % 10 > 0 && item.price % 10 < 5) {
            ballsInRus = 'a';
        } else {
            ballsInRus = 'ов';
        }

        productPrice.textContent = `${item.price} балл${ballsInRus}`;
        productInfo.append(productPrice);

        productName.textContent = item.name;
        productInfo.append(productName);
        item.sizes = item.sizes.split(',');
        productSizes.textContent = 'Размеры ';
        item.sizes.forEach((size, i) => {
            if (i !== 0) {
                productSizes.textContent += '/';
            }

            productSizes.textContent += size;
        });
        productInfo.append(productSizes);
        productInfo.append(productOrderDiv);

        productOpenModal.textContent = 'Заказать';
        productOpenModal.type = 'button';
        productOrderDiv.append(productOpenModal);
        productsBlocks.append(product);
    });
}

function getCards(type = 0) {
    let url;
    const orderBy = 'is_new';
    const orderDirection = 'desc';

    url = `${baseUrl}/product?column=${orderBy}&direction=${orderDirection}`;

    if (type !== 0) {
        url += `&type_id=${type}`;
    }

    fetch(url, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Accept:         'application/json',
        },
    })
        .then(response => response.json())
        .then((json) => {
            cardsInfo = json.data;
            renderBlock(json.data);
        })
        .catch(() => {
            document.querySelector('.products').textContent = 'Ошибка соединения, попробуйте повторить позже';
        });
}

function getDataByType() {
    document.querySelectorAll('input[name="hotBtn"]').forEach((elm) => {
        elm.addEventListener('input', () => {
            getCards(elm.value);
        });
    });
}

getDataByType();
getCards();
productModalWindow();
