import '../scss/style.scss';

document.querySelector('.header .search').addEventListener('click', (e) => {
    if (!e.target.classList.contains('search-icon')) {
        document.querySelector('.search input[type="search"]').focus();
    }
});

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

productModalWindow();
