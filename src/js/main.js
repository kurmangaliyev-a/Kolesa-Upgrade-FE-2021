import '../scss/style.scss';

const baseUrl = 'http://api.mcdir.me/api/v1';

document.querySelector('.header .search').addEventListener('click', (e) => {
    if (!e.target.classList.contains('search-icon')) {
        document.querySelector('.search input[type="search"]').focus();
    }
});

function openModal(id) {
    const modal = document.querySelector('.modal');

    modal.classList.remove('modal--hide');
    modal.textContent += id;
}
function productModalWindow() {
    const elements = document.querySelectorAll('.product__open-modal');
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
    elements.forEach((elm) => {
        elm.addEventListener('click', () => {
            modal.classList.remove('modal--hide');
            document.body.style.overflow = 'hidden';
        });
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
        img.src = `http://api.mcdir.me/${item.main_photo}`;
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

        if (item.price % 5 === 1) {
            ballsInRus = '';
        } else if (item.price % 5 > 0 && item.price % 5 < 5) {
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

function getCards(type = '') {
    let url;
    const orderBy = 'is_new';
    const orderDirection = 'desc';

    url = `${baseUrl}/product?column=${orderBy}&direction=${orderDirection}`;

    if (type !== '') {
        url = `&type_id=${type}`;
    }

    fetch(url, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Accept:         'application/json',
        },
    })
        .then(response => response.json())
        .then((json) => {
            renderBlock(json.data);
        })
        .catch(() => {
            alert('Ошибка соединения, попробуйте повторить позже');
        });
}
getCards();
productModalWindow();
